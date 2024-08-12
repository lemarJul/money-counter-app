import styled from "styled-components";
import TrashSvg from "../assets/trash-solid.svg";

const TrashIcon = styled.img`
  width: 100%;
  height: 100%;
  padding: var(--spacing-xs);
  object-fit: contain;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 5rem;

  border-radius: var(--border-radius);
  border: 2px solid var(--color-dark);
  overflow: hidden;
`;

const ResetButton = styled.button`
  font-size: var(--font-size-m);
  width: 20%;
  background-color: var(--color-disabled);
  height: 100%;
  border-radius: 0;
  border: none;
  color: var(--color-dark);
`;

const Display = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-xxl);
  padding: var(--spacing-l);
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
        <TrashIcon src={TrashSvg} alt="Reset" />
      </ResetButton>
    </Container>
  );
};
