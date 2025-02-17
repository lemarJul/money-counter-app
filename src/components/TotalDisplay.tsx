import { Paper, Stack } from "@mui/material";
import type { ICurrencyMetadata } from "../data/Money.types";
import { Total } from "./Total";
import { Actions } from "./Actions";

interface TotalDisplayProps {
  total: number;
  currencyMetaData: ICurrencyMetadata;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const TotalDisplay = ({
  total,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  currencyMetaData,
}: TotalDisplayProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 1, sm: 2 },
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "background.paper"
            : "background.default",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        sx={{ width: "100%" }}
      >
        <Total total={total} currencyMetaData={currencyMetaData} />
        <Actions
          onReset={onReset}
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </Stack>
    </Paper>
  );
};
