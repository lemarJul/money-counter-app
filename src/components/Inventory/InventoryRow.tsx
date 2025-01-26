import { useState } from "react";
import { DenominationInventory } from "../../modules/DenominationInventory";
import { NumberInput } from "./NumberInput";
import { useSwipeable } from "react-swipeable";
import styles from "./InventoryRow.module.css";

export const InventoryRow = ({
  inventory,
  inventoryIndex,
  setCounter,
}: {
  inventory: DenominationInventory;
  inventoryIndex: number;
  setCounter: (
    inventoryIndex: number,
    counterKey: keyof typeof inventory.counters,
    value: number
  ) => void;
}) => {
  const [swiped, setSwiped] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setSwiped(true);
    },
    onSwipedRight: () => {
      setSwiped(false);
    },
  });

  return (
    <div className={styles.row}>
      <div className={styles.label}>
        <span>{inventory.label}</span>
        <span className={styles.totalCount}>x {inventory.totalUnits}</span>
      </div>
      <div
        className={`${styles.swipeableContainer} ${
          swiped ? styles.swiped : ""
        }`}
        {...swipeHandlers}
      >
        <div className={styles.countersContainer}>
          {Object.entries(inventory.counters).map(([key, counter]) => {
            const typedKey = key as keyof typeof inventory.counters;
            return (
              counter && (
                <NumberInput
                  key={inventoryIndex + key}
                  value={counter?.count}
                  onChange={(val: number) =>
                    setCounter(inventoryIndex, typedKey, val)
                  }
                  style={{ width: "100%" }}
                />
              )
            );
          })}
        </div>

        <div className={styles.resetContainer}>
          <button
            className={styles.resetButton}
            onClick={(e) => {
              e.preventDefault();
              Object.entries(inventory.counters).forEach(([key, counter]) => {
                const typedKey = key as keyof typeof inventory.counters;
                if (counter) setCounter(inventoryIndex, typedKey, 0);
              });
              setSwiped(false);
            }}
            tabIndex={-1}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};
