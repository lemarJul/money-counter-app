import { DenominationInventory } from '../modules/DenominationInventory';
import { MoneyDenominations, MoneyDenominationType } from '../modules/MoneyDenominations';
import { useState, useMemo, useEffect, useCallback } from 'react';

const MAX_HISTORY = 30; // Maximum number of states to keep in history

const STORAGE_KEY = 'cashFloat';

const loadFromStorage = (): DenominationInventory[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return MoneyDenominations.map((denomination) => new DenominationInventory({ denomination }));
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((item: {
      denomination: MoneyDenominationType;
      counters: {
        unit: { count: number };
        roll?: { count: number };
        weight?: { count: number };
      };
    }) => {
      // Create a new DenominationInventory with the stored data
      const inventory = new DenominationInventory({ 
        denomination: item.denomination,
      });
      
      // Set the counts from stored data
      if (inventory.counters.unit) {
        inventory.counters.unit.count = item.counters.unit.count;
      }
      if (item.counters.roll && inventory.counters.roll) {
        inventory.counters.roll.count = item.counters.roll.count;
      }
      if (item.counters.weight && inventory.counters.weight) {
        inventory.counters.weight.count = item.counters.weight.count;
      }
      
      return inventory;
    });
  } catch (error) {
    console.error('Error loading cash float from storage:', error);
    return MoneyDenominations.map((denomination) => new DenominationInventory({ denomination }));
  }
};


export function useCashFloat() {
  const [cashFloat, setCashFloat] = useState(loadFromStorage);
  const [history, setHistory] = useState<DenominationInventory[][]>([loadFromStorage()]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Save to localStorage whenever cashFloat changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cashFloat));
  }, [cashFloat]);

  // Update history when cashFloat changes
  const updateHistory = useCallback((newState: DenominationInventory[]) => {
    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);
      // Add new state and limit history length
      return [...newHistory, newState].slice(-MAX_HISTORY);
    });
    setCurrentIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const previousState = history[newIndex];
      if (previousState) {
        setCurrentIndex(newIndex);
        setCashFloat(previousState);
      }
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      const nextState = history[newIndex];
      if (nextState) {
        setCurrentIndex(newIndex);
        setCashFloat(nextState);
      }
    }
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;


  const CashFloatTotalValue = useMemo(() => cashFloat.reduce((acc: number, inventory) => acc + inventory.totalValue, 0), [cashFloat]);

  const setCounter = useCallback(
    (
      inventoryIndex: number,
      counterKey: keyof DenominationInventory["counters"],
      newValue: number
    ) => {
      setCashFloat((prev) => {
        const inventory = prev[inventoryIndex];
        if (!inventory) return prev;
        
        const counter = inventory.counters[counterKey];
        if (counter) counter.count = newValue;
        
        const newState = prev.with(inventoryIndex, new DenominationInventory({
          denomination: inventory.denomination,
          counters: inventory.counters
        }));
        updateHistory(newState);
        return newState;
      });
    },
    [updateHistory]
  );

  const resetCashFloat = useCallback(() => {
    const newState = cashFloat.map((inventory) => {
      Object.values(inventory.counters).forEach((counter) => {
        if (counter) counter.count = 0;
      });
      return new DenominationInventory(inventory);
    });
    setCashFloat(newState);
    updateHistory(newState);
  }, [cashFloat, updateHistory]);

  return { 
    cashFloat, 
    CashFloatTotalValue, 
    setCounter, 
    resetCashFloat,
    undo,
    redo,
    canUndo,
    canRedo
  };
}
