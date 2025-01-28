import { useState, useMemo, useEffect, useCallback } from "react";
import { loadTillCount, storeTillCount } from "../modules/localStorage";
import { DenominationCount } from "../modules/DenominationCounter";
import type { DenominationCountInterface } from "../modules/DenominationCounter.types";
import { useStateHistory } from "../hooks/useStateHistory";

export function useTillCount() {
  const initialState = loadTillCount();
  const [tillCount, setTillCount] = useState(initialState);
  const { updateHistory, undo: undoHistory, redo: redoHistory, canUndo, canRedo } = useStateHistory(initialState);

  // Save to localStorage whenever cashCount changes
  useEffect(() => {
    storeTillCount(tillCount);
    console.log("saved to local storage");
  }, [tillCount]);

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
        console.log({ prev });
        const denominationCount = prev[denominationIndex];
        if (!denominationCount) return prev;

        // Create new counterSet object with updated value
        const countersInit = {
          unit:
            counterKey === "unit"
              ? newValue
              : denominationCount.counterSet.unit.count,
          ...(denominationCount.counterSet.roll && {
            roll:
              counterKey === "roll"
                ? newValue
                : denominationCount.counterSet.roll.count,
          }),
          ...(denominationCount.counterSet.weight && {
            weight:
              counterKey === "weight"
                ? newValue
                : denominationCount.counterSet.weight.count,
          }),
        };

        const newState = [...prev];
        newState[denominationIndex] = new DenominationCount({
          denomination: denominationCount.denomination,
          countersInit,
        });
        updateHistory(newState);
        return newState;
      });
    },
    [updateHistory]
  );

  const resetTillCount = useCallback(() => {
    const newState = tillCount.map((denomination) => {
      return new DenominationCount({
        denomination: denomination.denomination,
        countersInit: {
          unit: 0,
          ...(denomination.counterSet.roll && { roll: 0 }),
          ...(denomination.counterSet.weight && { weight: 0 }),
        },
      });
    });
    setTillCount(newState);
    updateHistory(newState);
  }, [tillCount, updateHistory]);

  const handleUndo = useCallback(() => {
    const previousState = undoHistory();
    if (previousState) setTillCount(previousState);
  }, [undoHistory]);

  const handleRedo = useCallback(() => {
    const nextState = redoHistory();
    if (nextState) setTillCount(nextState);
  }, [redoHistory]);

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
