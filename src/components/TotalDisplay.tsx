import styled from "styled-components";
import TrashSvg from "../assets/trash-solid.svg";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 10%;
  font-size: 5rem;
  gap: var(--spacing-m);
  border-radius: var(--border-radius);
`;
const Total = styled.div`
  flex: 1;
  text-align: center;
  font-size: var(--font-size-xxl);
  padding: var(--spacing-l);
  border-radius: var(--border-radius);
  border: var(--border-width) solid var(--border-color);
`;
const ResetButton = styled.button`
  background-color: var(--background-color);
  aspect-ratio: 1;
  height: 100%;
  padding: var(--spacing-l);
  border: var(--border-width) solid var(--border-color);
  font-size: var(--font-size-s);
  border-radius: var(--border-radius);
  &:hover {
    border-color: var(--color-primary-faded);
    background-color: var(--color-primary-faded);
  }
  &:active {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }
  &:focus,
  &:focus-visible {
    outline: none;
    border-color: none;
  }
  @media (prefers-color-scheme: dark) {
    img {
      filter: invert(1);
    }
  }
`;

export const TotalDisplay = ({
  total,
  onReset,
}: {
  total: number;
  onReset: () => void;
}) => {
  return (
    <Container>
      <Total>{total.toFixed(2)} €</Total>
      <ResetButton onClick={onReset}>
        <img src={TrashSvg} alt="Reset" />
      </ResetButton>
    </Container>
  );
};
