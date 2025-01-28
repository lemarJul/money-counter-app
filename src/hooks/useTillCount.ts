import { useMemo, useCallback } from "react";
import { DenominationCount } from "../modules/DenominationCounter";
import type { DenominationCountInterface } from "../modules/DenominationCounter.types";
import { useStateHistory } from "./useStateHistory";
import { usePersistedState } from "./usePersistedState";
import { loadTillCount } from "../modules/localStorage";
import { hydrateDenominationCounts } from "../modules/tillCount.hydration";

export function useTillCount() {
  const initialState = loadTillCount();
  const [tillCount, setTillCount] = usePersistedState(
    "tillCount",
    initialState,
    hydrateDenominationCounts
  );
  const { updateHistory, undo: undoHistory, redo: redoHistory, canUndo, canRedo } = useStateHistory(
    initialState,
    30,
    hydrateDenominationCounts
  );

  const tillCountTotalValue = useMemo(
    () => tillCount.reduce((acc: number, denomination) => acc + denomination.totalValue, 0),
    [tillCount]
  );

  const updateTillCount = useCallback(
    (
      denominationIndex: number,
      counterKey: keyof DenominationCountInterface["counterSet"],
      newValue: number
    ) => {
      setTillCount((prev) => {
        const denominationCount = prev[denominationIndex];
        if (!denominationCount) return prev;

        const newState = [...prev];
        newState[denominationIndex] = denominationCount.updateCounter(counterKey, newValue);
        updateHistory(newState);
        return newState;
      });
    },
    [updateHistory, setTillCount]
  );

  const resetTillCount = useCallback(() => {
    const newState = tillCount.map((denomination) =>
      DenominationCount.createEmpty(denomination.denomination)
    );
    setTillCount(newState);
    updateHistory(newState);
  }, [tillCount, setTillCount, updateHistory]);

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
