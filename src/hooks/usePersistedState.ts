import { useState, useEffect } from "react";

export function usePersistedState<TStored, TRuntime>( // Custom hook to manage persistent state in localStorage.
  key: string, // Key used to store the state in localStorage.
  initialValue: TStored, // Initial value for storage
  hydrate: (value: unknown) => TRuntime, // Function to convert stored value to runtime value
  dehydrate: (value: TRuntime) => TStored, // Function to convert runtime value to storage format
  skipInitialLoad: boolean = false // Optional flag to skip initial load from localStorage
) {
  const [state, setState] = useState<TRuntime>(() => {
    if (skipInitialLoad) {
      return hydrate(initialValue);
    }

    // Attempt to load state from localStorage.
    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : initialValue;
      return hydrate(parsed);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return hydrate(initialValue);
    }
  });

  useEffect(() => {
    // Attempt to save state to localStorage.
    try {
      // Store the state in its storage format
      localStorage.setItem(key, JSON.stringify(dehydrate(state)));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, state]);

  // Setter function with hydration support.
  const setStateWithHydration = (value: TRuntime | ((prev: TRuntime) => TRuntime)) => {
    setState((prev) => {
      // Handle functional updates
      const newValue = value instanceof Function ? value(prev) : value;
      return newValue;
    });
  };

  // Return state and setter function.
  return [state, setStateWithHydration] as const;
}
