import { Grid, Typography, Box } from "@mui/material";
import { DenominationInventory } from "../../modules/DenominationInventory";
import { NumberInput } from "./NumberInput";

interface InventoryRowProps {
  inventory: DenominationInventory;
  inventoryIndex: number;
  setCounter: (
    inventoryIndex: number,
    counterKey: keyof DenominationInventory["counters"],
    newValue: number
  ) => void;
}

export const InventoryRow = ({
  inventory,
  inventoryIndex,
  setCounter,
}: InventoryRowProps) => {
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
          <Typography variant="body1">{inventory.label}</Typography>
          <Typography variant="caption" color="text.secondary">
            x {inventory.totalUnits}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <NumberInput
          value={inventory.counters.unit.count}
          onChange={(value) => setCounter(inventoryIndex, "unit", value)}
        />
      </Grid>
      <Grid item xs={3}>
        {inventory.counters.roll && (
          <NumberInput
            value={inventory.counters.roll.count}
            onChange={(value) => setCounter(inventoryIndex, "roll", value)}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        {inventory.counters.weight && (
          <NumberInput
            value={inventory.counters.weight.count}
            onChange={(value) => setCounter(inventoryIndex, "weight", value)}
          />
        )}
      </Grid>
    </Grid>
  );
};
