import styles from "./TotalDisplay.module.css";
import TrashSvg from "../assets/trash-solid.svg";

export const TotalDisplay = ({
  total,
  onReset,
}: {
  total: number;
  onReset: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <span>{total.toFixed(2)} €</span>
      </div>
      <button className={styles.resetButton} onClick={onReset}>
        <img src={TrashSvg} alt="Reset" />
      </button>
    </div>
  );
};
