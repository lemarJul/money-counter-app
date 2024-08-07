import styled from "styled-components";

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 2.5/1;
  font-size: 5rem;
  background-color: lightgray;
  border-radius: var(--border-radius);
`;

export const TotalDisplay = ({ total }: { total: string | number }) => {
  return (
    <Total>
      <span>{total}€</span>
    </Total>
  );
};
