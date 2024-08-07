import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 10rem;
`;

const Count = styled.input`
  display: inline-block;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  font-size: 10rem;
  background-color: lightgray;
  border-radius: var(--border-radius);
  box-sizing: border-box;
  border: none;
  text-align: center;
  width: 100%;
`;
const Decrement = styled.button`
  background-color: var(--color-primary);
  padding: 0.5rem;
  color: white;
  border-radius: var(--border-radius);
  min-width: 25%;
  border: none;
  &::after {
    content: "-";
  }
`;
const Increment = styled(Decrement)`
  padding: 0.5rem;
  &::after {
    content: "+";
  }
`;

//const RadioContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   width: 100%;
// `;

// const Label = styled.label<{ checked: boolean }>`
//   display: inline-block;
//   color: ${(props) => (props.checked ? "white" : "")};
//   background-color: ${(props) => (props.checked ? "blue" : "")};

//   width: 100%;
// `;

// const HiddenInput = styled.input`
//   display: none;
// `;

// const inputTypes = ["€", "grams", "rolls"];

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <Container>
        <InputContainer>
          <Decrement
            onClick={() => {
              onChange(value - 1 < 0 ? 0 : value - 1);
            }}
          />
          <Count
            type="number"
            value={value}
            onChange={(e) => onChange(+e.target.value)}
          />
          <Increment
            onClick={() => {
              onChange(value + 1);
            }}
          />
        </InputContainer>
      </Container>
    </>
  );
};
