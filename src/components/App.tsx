import {
  AppBar as MuiAppBar,
  Container,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppBar } from "./AppBar";

import { useTillCount } from "../hooks/useTillCount";
import { TotalDisplay } from "./TotalDisplay";
import { EUR, EUR_DENOMINATIONS } from "../data/Euro";
import { CurrencyHeader } from "./CurrencyHeader";
import { CurrencyTable } from "./CurrencyTable";

const Config = {
  currencyMetaData: EUR,
  denomination: EUR_DENOMINATIONS,
};

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
  } = useTillCount(Config.currencyMetaData, Config.denomination);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100%",
        py: { xs: 1, sm: 2, md: 3 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* <AppBar></AppBar> */}
        <CurrencyHeader
          currencyMetaData={Config.currencyMetaData}
        ></CurrencyHeader>
        <CurrencyTable
          currencyMetaData={Config.currencyMetaData}
          tillCount={tillCount}
          updateTillCount={updateTillCount}
        ></CurrencyTable>
        <TotalDisplay
          total={tillCountTotalValue}
          currencyMetaData={Config.currencyMetaData}
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
