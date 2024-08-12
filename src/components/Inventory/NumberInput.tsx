import styled from "styled-components";

const StyledInput = styled.input`
  all: unset;
  text-align: center;
  font-size: var(--font-size-xl);

  border: var(--border-width) solid var(--color-black);
  background-color: var(--color-black);
  border-radius: var(--border-radius);
  color: var(--color-white);
  aspect-ratio: 1/1;

  &[value="0"] {
    border-color: var(--color-lightgray);
    background-color: var(--color-lightgray);
  }

  &:focus {
    background-color: var(--color-primary-faded);
    border-color: var(--color-primary-faded);
    font-weight: bold;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--color-black);
    border-color: var(--color-lightgray);
    background-color: var(--color-lightgray);

    &[value="0"] {
      color: var(--color-gray);
      border-color: var(--color-black);
      background-color: var(--color-black);
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
      // onClick={(e) => e.target.select()}
    ></StyledInput>
  );
};
