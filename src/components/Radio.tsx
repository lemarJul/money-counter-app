import styled from "styled-components";

const HiddenRadio = styled.input`
  display: none;
`;
const Label = styled.label<{ value: number }>`
  color: white;
  border: 2px solid var(--color-disabled);
  background-color: var(--color-disabled);
  text-align: center;
  font-size: var(--font-size-xl);

  ${({ value }) =>
    value !== 0
      ? "border-color: var(--color-dark) ; background-color: var(--color-dark);"
      : ""};

  ${HiddenRadio}:checked + & {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }
`;
// const Label = styled.label`
//   text-align: center;
//   font-size: 2rem;
// `;

export const Radio = ({
  label,
  value,
  id,
  checked,
  onChange,
}: {
  label: string;
  value: number;
  id: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <>
      <HiddenRadio
        id={id}
        name="showInput"
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={id} value={value}>
        {label}
      </Label>
    </>
  );
};
