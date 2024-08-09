import styled from "styled-components";

const Number = styled.input`
  all: unset;
  text-align: center;
  font-size: var(--font-size-xl);
  width: 100%;
  height: 100%;
  border: 2px solid var(--color-dark);
  background-color: var(--color-dark);
  border-radius: var(--border-radius);

  &[value="0"] {
    border-color: var(--color-disabled);
    background-color: var(--color-disabled);
  }

  &:focus {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }
`;

export const NumberInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: Function;
}) => {
  return (
    <Number
      type="number"
      value={value ?? ""}
      onChange={(e) => onChange(+e.target.value > 0 ? +e.target.value : 0)}
      placeholder="0"
    ></Number>
  );
};
