import styled from "styled-components";
import "./App.css";
// State
import { useCashFloat } from "../state/cashFloat.state.ts";
// Components
import { TotalDisplay } from "./TotalDisplay";
import { InventoryRow } from "./Inventory/InventoryRow.tsx";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  padding: 1rem;
  position: relative;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border: var(--border-width) solid var(--color-black);
  border-radius: var(--border-radius);
`;

const InventoryHeaders = styled.div`
  z-index: 2;
  position: sticky;
  top: 0;
  color: white;
  background-color: var(--color-black);
  display: flex;
  height: fit-content;
  align-items: center;

  padding: var(--spacing-m);
  gap: var(--spacing-s);
  font-size: var(--font-size-l);

  & > span {
    flex: 1;
    min-width: 80px;
  }
`;

const RowLabel = styled.span`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: var(--font-size-xl);
  min-width: 80px;
`;

function App() {
  const { cashFloat, CashFloatTotalValue, setCounter, resetCashFloat } =
    useCashFloat();

  return (
    <Container>
      <Form action="">
        <InventoryHeaders>
          <RowLabel>€</RowLabel>
          <span>units</span>
          <span>rolls</span>
          <span>grams</span>
        </InventoryHeaders>

        {cashFloat.map((inventory, inventoryIndex) => (
          <InventoryRow
            key={`inventory-${inventoryIndex}`}
            inventory={inventory}
            inventoryIndex={inventoryIndex}
            setCounter={setCounter}
          />
        ))}
      </Form>
      <TotalDisplay total={CashFloatTotalValue} onReset={resetCashFloat} />
    </Container>
  );
}

export default App;
