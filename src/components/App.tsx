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
  overflow: scroll;
  border: 2px solid var(--color-dark);
  border-radius: var(--border-radius);
`;

const InventoryHeaders = styled.div`
  z-index: 2;
  position: sticky;
  top: 0;
  color: white;
  background-color: var(--color-black);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-dark);
  padding: var(--spacing-m);
  gap: var(--spacing-m);
`;

const RowLabel = styled.span`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: var(--font-size-xl);
  min-width: 80px;
`;

const Header = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  color: white;
  background-color: var(--color-dark);
  display: flex;
  height: fit-content;
  justify-content: space-between;
  align-items: center;

  padding: var(--spacing-m);
  gap: var(--spacing-s);
  font-size: var(--font-size-l);

  & > span {
    min-width: 80px;
  }
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
