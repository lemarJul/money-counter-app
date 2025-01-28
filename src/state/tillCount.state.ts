import { useMemo, useCallback } from "react";
import { DenominationCount } from "../modules/DenominationCounter";
import type { DenominationCountInterface } from "../modules/DenominationCounter.types";
import { useStateHistory } from "../hooks/useStateHistory";
import { usePersistedState } from "../hooks/usePersistedState";
import { loadTillCount } from "../modules/localStorage";

// Helper to hydrate plain objects into DenominationCount instances
const hydrateDenominationCounts = (
  counts: DenominationCountInterface[]
): DenominationCount[] => {
  return counts.map(
    (count) =>
      new DenominationCount({
        denomination: count.denomination,
        countersInit: {
          unit: count.counterSet.unit.count,
          ...(count.counterSet.roll && { roll: count.counterSet.roll.count }),
          ...(count.counterSet.weight && { weight: count.counterSet.weight.count }),
        },
      })
  );
};

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
