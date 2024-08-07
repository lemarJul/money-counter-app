import { useState } from "react";
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

// const RadioContainer = styled.div`
//   display: flex;
//   // flex-direction: column;
//   gap: var(--spacing-s);
//   justify-content: center;
//   width: 100%;
//   color: white;
// `;

function App() {
  const { cashFloat, CashFloatTotalValue, setCounter, resetCashFloat } =
    useCashFloat();

  const [activeCounter, setActiveCounter] = useState<{
    inventoryIndex: number;
    counterKey: keyof (typeof cashFloat)[0]["counters"];
  } | null>(null);

  return (
    <Container>
      {/* <Top>
        {activeCounter ? (
          <NumberInput
            value={
              cashFloat[activeCounter.inventoryIndex].counters[
                activeCounter.counterKey
              ]!.count ?? 0
            }
            onChange={(val) =>
              setCounter(
                activeCounter.inventoryIndex,
                activeCounter.counterKey,
                val
              )
            }
          />
        ) : (
          <>
            <TotalDisplay total={CashFloatTotalValue} />
          </>
        )}
      </Top> */}
      {/* <span>
        <button onClick={resetCashFloat}>Reset</button>
        <button onClick={() => setActiveCounter(null)}>total</button>
      </span> */}
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

            {/* {Object.entries(inventory.counters).map(([key, counter]) => {
              const typedKey = key as keyof typeof inventory.counters;
              return (
                counter && (
                  <Radio
                    key={inventoryIndex + key}
                    id={inventoryIndex + key}
                    label={counter?.count.toString()}
                    // label={counter?.count + " " + counter?.unit}
                    value={counter?.count}
                    checked={
                      activeCounter?.inventoryIndex === inventoryIndex &&
                      activeCounter.counterKey === typedKey
                    }
                    onChange={() =>
                      setActiveCounter({
                        inventoryIndex: inventoryIndex,
                        counterKey: typedKey,
                      })
                    }
                  />
                )
              );
            })} */}

            {Object.entries(inventory.counters).map(([key, counter]) => {
              const typedKey = key as keyof typeof inventory.counters;
              return (
                counter && (
                  <NumberInput
                    key={inventoryIndex + key}
                    // label={counter?.count + " " + counter?.unit}
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
