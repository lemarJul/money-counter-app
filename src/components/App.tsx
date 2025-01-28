import { Container, Paper, Typography, Grid } from "@mui/material";

import { useTillCount } from "../hooks/useTillCount";
import { TotalDisplay } from "./TotalDisplay";
import { DenominationRow } from "./row/DenominationRow";
import { DenominationCountInterface } from "../modules/DenominationCounter.types";

function App() {
  const {
    tillCount,
    tillCountTotalValue,
    updateTillCount,
    resetTillCount,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useTillCount();

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
          {tillCount.map((denomination, index) => {
            return (
              <DenominationRow
                key={denomination.denomination.id}
                label={denomination.label}
                totalUnits={denomination.totalUnits}
                counterSet={denomination.counterSet}
                setCount={(
                  counterKey: keyof DenominationCountInterface["counterSet"],
                  newValue: number
                ) => updateTillCount(index, counterKey, newValue)}
              />
            );
          })}
        </Paper>

        <TotalDisplay
          total={tillCountTotalValue}
          onReset={resetTillCount}
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
