import styled from "styled-components";
import { useState } from "react";
import { DenominationInventory } from "../../modules/DenominationInventory";
import { NumberInput } from "./NumberInput";
import { useSwipeable } from "react-swipeable";

const Row = styled.div`
  border-bottom: var(--border-width) solid var(--color-black);
  display: flex;
  width: 100%;
  height: 100px;
`;

const Label = styled.span`
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-m);
  min-width: 25%;
  justify-content: center;
  text-align: left;
  font-size: var(--font-size-xl);
  background-color: var(--color-white);
  //   background-color: lightgreen;
`;

const SwipeableContainer = styled.div<{ swiped: boolean }>`
  position: relative;
  display: flex;
  min-width: 150%;
  left: ${({ swiped }) => (swiped ? "-75%" : "0")};
  transition: left 0.3s;
`;
const CountersContainer = styled.div`
  display: flex;
  min-width: 50%;
  padding: var(--spacing-m);
  gap: var(--spacing-m);
`;
const ResetContainer = styled.div`
  min-width: 50%;
  display: flex;
  padding: var(--spacing-m);
`;

const ResetButton = styled.button`
  background-color: indianred;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  &:focus {
    outline: none;
  }
`;

const TotalCount = styled.span`
  width: 100%;
  fontsize: var(--font-size-m);
`;

export const InventoryRow = ({
  inventory,
  inventoryIndex,
  setCounter,
  ...props
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
      console.log("swiped left");
    },
    onSwipedRight: () => {
      setSwiped(false);
      console.log("swiped right");
    },
  });

  return (
    <Row>
      <Label>
        <span>{inventory.label}</span>
        <TotalCount style={{ width: "100%", fontSize: "var(--font-size-m)" }}>
          x {inventory.totalUnits}
        </TotalCount>
      </Label>
      <SwipeableContainer {...props} {...swipeHandlers} swiped={swiped}>
        <CountersContainer>
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
        </CountersContainer>

        <ResetContainer>
          <ResetButton
            onClick={(e) => {
              e.preventDefault();
              Object.entries(inventory.counters).forEach(([key, counter]) => {
                const typedKey = key as keyof typeof inventory.counters;
                if (counter) setCounter(inventoryIndex, typedKey, 0);
              });
              setSwiped(false);
            }}
          >
            delete
          </ResetButton>
        </ResetContainer>
      </SwipeableContainer>
    </Row>
  );
};
