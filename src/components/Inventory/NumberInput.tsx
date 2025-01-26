import styles from "./NumberInput.module.css";

export const NumberInput = ({
  value,
  onChange,
  style,
}: {
  value: number;
  style?: React.CSSProperties;
  onChange: (value: number) => void;
}) => {
  return (
    <input
      className={styles.input}
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
    />
  );
};
