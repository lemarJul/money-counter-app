import styled from "styled-components";

const StyledInput = styled.input`
  all: unset;
  text-align: center;
  font-size: var(--font-size-xl);
  background-color: var(--color-black);
  border: var(--border-width) solid var(--color-black);
  border-radius: var(--border-radius);
  aspect-ratio: 1/1;
  font-weight: bold;
  color: var(--color-white);

  &[value="0"] {
    background-color: var(--background-color);
    border-color: var(--color-disabled);
    color: var(--color-disabled);
  }

  &:focus {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary-faded);
    font-weight: bold;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--color-black);
    border-color: var(--color-disabled);
    background-color: var(--color-disabled);

    &[value="0"] {
      background-color: var(--background-color);
    }

    &:focus {
      color: var(--color-white);
      border-color: var(--color-primary);
      background-color: var(--color-primary);
    }
  }
`;

export const NumberInput = ({
  value,
  onChange,
  style,
}: {
  value: number;
  style?: React.CSSProperties;
  onChange: Function;
}) => {
  return (
    <StyledInput
      type="number"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
      min={0}
      style={style}
      onFocus={(e) => {
        if (e.target.value === "0") e.target.value = "";
      }}
      onBlurCapture={(e) => {
        if (e.target.value == "") e.target.value = "0";
      }}
      tabIndex={0}
    ></StyledInput>
  );
};
