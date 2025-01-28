import { useState, useCallback } from "react";

export function useStateHistory<T>(
  initialState: T,
  maxHistory: number = 30,
  hydrate?: (value: T) => T
) {
  const [history, setHistory] = useState<T[]>([
    hydrate ? hydrate(initialState) : initialState
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateHistory = useCallback(
    (newState: T) => {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        const stateToAdd = hydrate ? hydrate(newState) : newState;
        return [...newHistory, stateToAdd].slice(-maxHistory);
      });
      setHistoryIndex(prev => Math.min(prev + 1, maxHistory - 1));
    },
    [historyIndex, maxHistory, hydrate]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      return history[historyIndex - 1];
    }
    return history[historyIndex];
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      return history[historyIndex + 1];
    }
    return history[historyIndex];
  }, [history, historyIndex]);

  return {
    updateHistory,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
}
