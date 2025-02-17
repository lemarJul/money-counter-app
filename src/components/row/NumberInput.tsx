import { InputAdornment, TextField, alpha } from "@mui/material";
import { ChangeEvent, FocusEvent } from "react";
import { Tag as TagIcon } from "@mui/icons-material";

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
        },
      }}
      InputProps={{
        startAdornment:
          value > 0 ? (
            <InputAdornment position="start">
              <TagIcon
                color="primary"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  marginRight: { xs: -0.5, sm: 0 },
                }}
              />
            </InputAdornment>
          ) : null,
      }}
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          minHeight: { xs: 36, sm: 40 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
          padding: { xs: "0 4px", sm: "0 8px" },
          transition: "all 0.2s",
          backgroundColor: (theme) =>
            value === 0
              ? alpha(theme.palette.action.disabled, 0.1)
              : alpha(theme.palette.background.paper, 0.8),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
        },
        "& input": {
          padding: { xs: "6px 2px", sm: "8px 4px" },
          color: (theme) =>
            value === 0 ? theme.palette.text.disabled : "inherit",
        },
      }}
    />
  );
};
