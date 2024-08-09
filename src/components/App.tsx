import styled from "styled-components";
import "./App.css";
// State
import { useCashFloat } from "../state/cashFloat.state.ts";
// Components
import { NumberInput } from "./NumberInput";
import { TotalDisplay } from "./TotalDisplay";

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

const Row = styled.div`
  position: relative;
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
        <Header>
          <RowLabel>€</RowLabel>
          <span>units</span>
          <span>rolls</span>
          <span>grams</span>
        </Header>

        {cashFloat.map((inventory, inventoryIndex) => (
          <Row key={inventoryIndex}>
            <RowLabel>
              <span>{inventory.label}</span>
              <span style={{ width: "100%", fontSize: "var(--font-size-m)" }}>
                x {inventory.totalUnits}
              </span>
            </RowLabel>

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
                  />
                )
              );
            })}
          </Row>
        ))}
      </Form>
      <TotalDisplay total={CashFloatTotalValue} onReset={resetCashFloat} />
    </Container>
  );
}

export default App;
