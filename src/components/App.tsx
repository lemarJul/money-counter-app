import styles from "./App.module.css";
import "./App.css";
// State
import { useCashFloat } from "../state/cashFloat.state.ts";
// Components
import { TotalDisplay } from "./TotalDisplay";
import { InventoryRow } from "./Inventory/InventoryRow.tsx";

function App() {
  const { cashFloat, CashFloatTotalValue, setCounter, resetCashFloat } =
    useCashFloat();

  return (
    <div className={styles.container}>
      <div className={styles.inventory}>
        <div className={styles.inventoryHeaders}>
          <span className={styles.rowLabel}>€</span>
          <span>units</span>
          <span>rolls</span>
          <span>grams</span>
        </div>

        {cashFloat.map((inventory, inventoryIndex) => (
          <InventoryRow
            key={`inventory-${inventoryIndex}`}
            inventory={inventory}
            inventoryIndex={inventoryIndex}
            setCounter={setCounter}
          />
        ))}
      </div>
      <TotalDisplay total={CashFloatTotalValue} onReset={resetCashFloat} />
    </div>
  );
}

export default App;
