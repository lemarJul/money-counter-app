import { useState, useMemo, useEffect, useCallback } from "react";
import { loadTillCount, storeTillCount } from "../modules/localStorage";
import { DenominationCount } from "../modules/DenominationCounter";
import type { DenominationCountInterface } from "../modules/DenominationCounter.types";

const MAX_HISTORY = 30; // Maximum number of states to keep in history

export function useTillCount() {
  const initialState = loadTillCount();
  const [tillCount, setTillCount] = useState(initialState);
  const [history, setHistory] = useState<DenominationCountInterface[][]>([
    initialState,
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Save to localStorage whenever cashCount changes
  useEffect(() => {
    storeTillCount(tillCount);
    console.log("saved to local storage");
  }, [tillCount]);

  // Update history when cashCount changes
  const updateHistory = useCallback(
    (newState: DenominationCountInterface[]) => {
      setHistory((prev) => {
        // Remove any future states if we're not at the end
        const newHistory = prev.slice(0, historyIndex + 1);
        // Add new state and limit history length
        return [...newHistory, newState].slice(-MAX_HISTORY);
      });
      setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      if (previousState) {
        setHistoryIndex(newIndex);
        setTillCount(previousState);
      }
    }
  }, [historyIndex, history]);

  // const navigateHistory = useCallback(
  //   (n: -1 | 1) => {
  //     let newIndex = historyIndex + n;
  //     newIndex =
  //       newIndex < O
  //         ? 0
  //         : newIndex > historyIndex + 1
  //         ? history.length - 1
  //         : newIndex;
  //     const nextState = history[newIndex];
  //     if (nextState) {
  //       setHistoryIndex(delta);
  //       setTillCount(nextState);
  //     }
  //   },
  //   [historyIndex, history]
  // );

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      if (nextState) {
        setHistoryIndex(newIndex);
        setTillCount(nextState);
      }
    }
  }, [historyIndex, history]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const tillCountTotalValue = useMemo(
    () =>
      tillCount.reduce(
        (acc: number, denomination) => acc + denomination.totalValue,
        0
      ),
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

  return {
    tillCount,
    tillCountTotalValue,
    updateTillCount,
    resetTillCount,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
