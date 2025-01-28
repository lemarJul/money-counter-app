import { Container, Paper, Typography, Grid } from "@mui/material";
import { useCashCount } from "../state/cashFloat.state";
import { TotalDisplay } from "./TotalDisplay";
import { InventoryRow } from "./Inventory/InventoryRow";

function App() {
  const {
    cashCount: cashFloat,
    cashCountTotalValue: CashFloatTotalValue,
    setCounter,
    resetCashCount: resetCashFloat,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useCashCount();

  return (
    <Container maxWidth="md" sx={{ height: "100%", py: 2 }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Grid item xs={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              €
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              units
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              rolls
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              grams
            </Typography>
          </Grid>
        </Grid>

        <Paper
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "background.default",
          }}
          elevation={0}
        >
          {cashFloat.map((inventory, inventoryIndex) => (
            <InventoryRow
              key={`inventory-${inventoryIndex}`}
              inventory={inventory}
              inventoryIndex={inventoryIndex}
              setCounter={setCounter}
            />
          ))}
        </Paper>

        <TotalDisplay
          total={CashFloatTotalValue}
          onReset={resetCashFloat}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </Paper>
    </Container>
  );
}

export default App;
