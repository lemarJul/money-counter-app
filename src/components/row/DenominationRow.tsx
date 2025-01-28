import { Grid, Typography, Box } from "@mui/material";
import { NumberInput } from "./NumberInput";
import {
  DenominationCountInterface,
  counterSetType,
} from "../../modules/DenominationCounter.types";

interface DenominationRowProps {
  label: string;
  totalUnits: number;
  counterSet: counterSetType;
  setCount: (
    counterKey: keyof DenominationCountInterface["counterSet"],
    newValue: number
  ) => void;
}

export const DenominationRow = ({
  label,
  totalUnits,
  counterSet,
  setCount,
}: DenominationRowProps) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        p: 1,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Grid item xs={3}>
        <Box>
          <Typography variant="body1">{label}</Typography>
          <Typography variant="caption" color="text.secondary">
            x {totalUnits}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <NumberInput
          value={counterSet.unit.count}
          onChange={(value) => setCount("unit", value)}
        />
      </Grid>
      <Grid item xs={3}>
        {counterSet.roll && (
          <NumberInput
            value={counterSet.roll.count}
            onChange={(value) => setCount("roll", value)}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        {counterSet.weight && (
          <NumberInput
            value={counterSet.weight.count}
            onChange={(value) => setCount("weight", value)}
          />
        )}
      </Grid>
    </Grid>
  );
};
