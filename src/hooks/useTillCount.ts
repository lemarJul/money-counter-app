import { useMemo, useCallback } from "react";
import { DenominationCounter } from "../modules/DenominationCounter";
import type { counterSetType } from "../modules/DenominationCounter.types";
import { useStateHistory } from "./useStateHistory";
import { usePersistedState } from "./usePersistedState";
import {
  createTillCount,
  hydrateTillCountFromStorage,
  type StoredTillCountNew,
} from "../modules/tillCountUtils";
import { ICurrencyMetadata, IDenomination } from "../data/Money.types";

export function useTillCount(
  currencyMetaData: ICurrencyMetadata,
  denominations: readonly IDenomination[]
) {
  // Initial stored state
  const storedState = useMemo(
    (): StoredTillCountNew => ({
      state: [],
      currencyMetaData,
      denominations,
    }),
    [currencyMetaData, denominations]
  );

  // Hydration function to convert stored state to runtime state
  const hydrationFunction = useCallback(
    (stored: unknown) =>
      hydrateTillCountFromStorage(currencyMetaData, denominations, stored),
    [currencyMetaData, denominations]
  );

  // Dehydration function to convert runtime state to stored state
  const dehydrationFunction = useCallback(
    (runtime: DenominationCounter[]): StoredTillCountNew => ({
      state: runtime.map((counter) => ({
        id: counter.denomination.id,
        unit: counter.counterSet.unit.count,
        ...(counter.counterSet.weight?.count && {
          weight: counter.counterSet.weight.count,
        }),
        ...(counter.counterSet.roll?.count && {
          roll: counter.counterSet.roll.count,
        }),
      })),
      currencyMetaData,
      denominations,
    }),
    [currencyMetaData, denominations]
  );

  // Runtime state
  const [tillCount, setTillCount] = usePersistedState<
    StoredTillCountNew,
    DenominationCounter[]
  >("tillCount", storedState, hydrationFunction, dehydrationFunction);

  // Initial runtime state for history
  const initialRuntimeState = useMemo(
    () => createTillCount(currencyMetaData, denominations),
    [currencyMetaData, denominations]
  );

  const historyConfig = useMemo(
    () => ({
      initialState: initialRuntimeState,
      maxHistoryLength: 30,
    }),
    [initialRuntimeState]
  );

  const {
    updateHistory,
    undo: undoHistory,
    redo: redoHistory,
    canUndo,
    canRedo,
  } = useStateHistory<DenominationCounter[]>(
    historyConfig.initialState,
    historyConfig.maxHistoryLength
  );

  const tillCountTotalValue = useMemo(
    () =>
      tillCount.reduce(
        (acc: number, denomination: DenominationCounter) =>
          acc + denomination.totalValue,
        0
      ),
    [tillCount]
  );

  const updateTillCount = useCallback(
    (
      denominationIndex: number,
      counterKey: keyof counterSetType,
      newValue: number
    ) => {
      setTillCount((prev: DenominationCounter[]) => {
        const denominationCount = prev[denominationIndex];
        if (!denominationCount) return prev;

        const newState = [...prev];
        newState[denominationIndex] = denominationCount.updateCounter(
          counterKey,
          newValue
        );
        updateHistory(newState);
        return newState;
      });
    },
    [updateHistory, setTillCount]
  );

  const resetTillCount = useCallback(() => {
    const newState = tillCount.map(
      (denomination: DenominationCounter) =>
        new DenominationCounter({
          denomination: denomination.denomination,
          currencyMetaData,
        })
    );
    setTillCount(newState);
    updateHistory(newState);
  }, [tillCount, setTillCount, updateHistory, currencyMetaData]);

  const handleUndo = useCallback(() => {
    const previousState = undoHistory();
    if (previousState) {
      setTillCount(previousState);
    }
  }, [setTillCount, undoHistory]);

  const handleRedo = useCallback(() => {
    const nextState = redoHistory();
    if (nextState) {
      setTillCount(nextState);
    }
  }, [setTillCount, redoHistory]);

  return {
    tillCount,
    tillCountTotalValue,
    updateTillCount,
    resetTillCount,
    undo: handleUndo,
    redo: handleRedo,
    canUndo,
    canRedo,
  };
}
