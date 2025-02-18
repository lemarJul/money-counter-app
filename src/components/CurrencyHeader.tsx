import { Typography, Grid, Box, alpha, IconButton } from "@mui/material";
import type { ICurrencyMetadata } from "../data/Money.types";

interface HeaderProps {
  currencyMetaData: ICurrencyMetadata;
}

export const CurrencyHeader: React.FC<HeaderProps> = ({ currencyMetaData }) => {
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{ display: "flex", width: "100%" }}
      >
        <Grid item xs={3} sx={{ flex: 1 }}>
          <IconButton
            sx={{
              p: { xs: 0.5, sm: 0.75 },
              borderRadius: 1,
              minWidth: { xs: 28, sm: 32 },
              width: "100%",
              textAlign: "center",
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 1,
              boxSizing: "border-box",
              "&:hover": {
                bgcolor: (theme) =>
                  alpha(theme.palette.background.default, 0.1),
              },
            }}
          >
            {currencyMetaData.symbol}
          </IconButton>
        </Grid>
        <Grid item xs={3} sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Units
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.background.default, 0.1),
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Rolls
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Grams
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
