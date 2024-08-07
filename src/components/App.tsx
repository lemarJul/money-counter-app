import { useState } from "react";
import styled from "styled-components";
import "./App.css";
// State
import { useCashFloat } from "../state/cashFloat.state.ts";
// Components
import { NumberInput } from "./CashInput";
import { TotalDisplay } from "./TotalDisplay";
import { Radio } from "./Radio";
import { Display } from "phaser";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  font-size: 2rem;
`;
const Top = styled.div`
  display: flex;
  place-item: center;

  min-height: 25%;
  max-height: 25%;
  padding: 1rem;
  gap: 1rem;
  background-color: var(--color-dark);
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: scroll;
  border: 2px solid gray;
  border-radius: var(--border-radius);
`;

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-dark);
  margin: var(--spacing-xs) 0;
  padding: var(--spacing-m);
  gap: var(--spacing-s);
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
  border-bottom: 2px solid var(--color-light);
  padding: var(--spacing-m);
  gap: var(--spacing-s);
  font-size: var(--font-size-l);
`;

const RowLabel = styled.span`
  width: 100%;
  padding: var(--spacing-m);
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
  justify-content: center;
  width: 100%;
  color: white;
`;

function App() {
  const { cashFloat, CashFloatTotalValue, setCounter, resetCashFloat } =
    useCashFloat();

  const [activeCounter, setActiveCounter] = useState<{
    inventoryIndex: number;
    counterKey: keyof (typeof cashFloat)[0]["counters"];
  } | null>(null);

  return (
    <Container>
      <Top>
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
        )}{" "}
      </Top>
      <span>
        <button onClick={resetCashFloat}>Reset</button>
        <button onClick={() => setActiveCounter(null)}>total</button>
      </span>
      <Form action="">
        {/* <Header>
          <RowLabel>€</RowLabel>
          <RowLabel>unit</RowLabel>
          <RowLabel>roll</RowLabel>
          <RowLabel>gram</RowLabel>
        </Header> */}
        {cashFloat.map((inventory, inventoryIndex) => (
          <Row key={inventoryIndex}>
            <RowLabel>
              {inventory.label}€
              <div style={{ width: "100%", fontSize: "var(--font-size-m)" }}>
                x {inventory.totalUnits}
              </div>
            </RowLabel>
            <RadioContainer>
              {Object.entries(inventory.counters).map(
                ([key, counter], counterIndex) => {
                  const typedKey = key as keyof typeof inventory.counters;
                  return (
                    counter && (
                      <Radio
                        key={inventoryIndex + key}
                        id={inventoryIndex + key}
                        label={counter?.count + " " + counter?.unit}
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
                }
              )}
            </RadioContainer>
          </Row>
        ))}
      </Form>
    </Container>
  );
}

export default App;
