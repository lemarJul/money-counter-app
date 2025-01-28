import { TextField } from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const NumberInput = ({ value = 0, onChange }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, +e.target.value);
    onChange(Number.isFinite(newValue) ? newValue : 0);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") e.target.value = "";
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") e.target.value = "0";
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputProps={{
        min: 0,
        step: 1,
        style: {
          textAlign: "center",
          opacity: value ? 1 : 0.3,
        },
      }}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};
