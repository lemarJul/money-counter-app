import { Paper, Typography } from "@mui/material";
import type { ICurrencyMetadata } from "../data/Money.types";

interface TotalProps {
  total: number;
  currencyMetaData: ICurrencyMetadata;
}

export const Total = ({ total, currencyMetaData }: TotalProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        m: 1,
        flexGrow: 1,

        boxSizing: "border-box",
        p: { xs: 2, sm: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "primary.dark",
        color: "white",
        borderRadius: 2,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: { xs: "none", sm: "scale(1.02)" },
          boxShadow: "0 12px 48px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          letterSpacing: 2,
          fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {total.toFixed(2)} {currencyMetaData.symbol}
      </Typography>
    </Paper>
  );
};
