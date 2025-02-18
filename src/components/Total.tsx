import { Paper, Typography, Box } from "@mui/material";
import type { ICurrencyMetadata } from "../data/Money.types";

interface TotalProps {
  total: number;
  currencyMetaData: ICurrencyMetadata;
}

export const Total = ({ total, currencyMetaData }: TotalProps) => {
  return (
    <Box
      sx={{
        p: 1,
        borderTop: 1,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: "primary.dark",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            letterSpacing: 2,
            fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
            textAlign: "center",
          }}
        >
          {total.toFixed(2)} {currencyMetaData.symbol}
        </Typography>
      </Paper>
    </Box>
  );
};
