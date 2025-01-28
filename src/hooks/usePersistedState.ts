import { useState, useEffect } from "react";

export function usePersistedState<T>( // Custom hook to manage persistent state in localStorage.
  key: string, // Key used to store the state in localStorage.
  initialValue: T, // Initial value for the state.
  hydrate?: (value: T) => T // Optional function to hydrate the parsed value from localStorage.
) {
  const [state, setState] = useState<T>(() => {
    // Attempt to load state from localStorage.
    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : initialValue;
      return hydrate ? hydrate(parsed) : parsed;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    // Attempt to save state to localStorage.
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, state]);

  // Setter function with hydration support.
  const setStateWithHydration = (value: T | ((prev: T) => T)) => {
    setState((prev) => {
      // Handle functional updates.
      const newValue = value instanceof Function ? value(prev) : value;
      // Apply hydration function if provided.
      return hydrate ? hydrate(newValue) : newValue;
    });
  };

  // Return state and setter function.
  return [state, setStateWithHydration] as const;
}
