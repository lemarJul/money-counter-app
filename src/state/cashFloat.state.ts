import { DenominationInventory } from '../modules/DenominationInventory';
import { MoneyDenominations } from '../modules/MoneyDenominations';
import { useState, useMemo } from 'react';


export function useCashFloat() {
  const [cashFloat, setCashFloat] = useState(MoneyDenominations.map((denomination) => new DenominationInventory({ denomination })));


  const CashFloatTotalValue = useMemo(() => cashFloat.reduce((acc: number, inventory) => acc + inventory.totalValue, 0), [cashFloat]);

  const setCounter = (
    inventoryIndex: number,
    counterKey: keyof DenominationInventory["counters"],
    newValue: number
  ) => {
    setCashFloat((prev) => {
      const inventory = prev[inventoryIndex];
      const counter = inventory.counters[counterKey]
      if (counter) counter.count = newValue;
      return prev.with(inventoryIndex, new DenominationInventory(inventory));
    });
  };

  const resetCashFloat = () => {
    setCashFloat(
      cashFloat.map((inventory) => {
        Object.values(inventory.counters).forEach((counter) => {
          if (counter) counter.count = 0;
        });
        return new DenominationInventory(inventory);
      })
    );
  };

  return { cashFloat, CashFloatTotalValue, setCounter, resetCashFloat };
}