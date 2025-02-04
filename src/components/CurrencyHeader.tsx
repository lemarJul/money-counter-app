import { Typography, Grid, Box, alpha, IconButton } from "@mui/material";
import { EUR } from "../data/Euro";

interface HeaderProps {
  currencyMetaData: typeof EUR;
}

export const CurrencyHeader: React.FC<HeaderProps> = ({ currencyMetaData }) => {
  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        background: (theme) =>
          `linear-gradient(45deg, ${theme.palette.grey[900]}, ${theme.palette.grey[800]})`,
        borderBottom: 1,
        borderColor: "divider",
        color: "white",
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={3}>
          <IconButton
            component="span"
            sx={{
              color: "white",
              p: { xs: 0.5, sm: 0.75 },
              borderRadius: 1,
              minWidth: { xs: 28, sm: 32 },
              width: "100%",
              textAlign: "center",
              borderColor: "gray",
              borderStyle: "solid",
              borderWidth: 0.1,
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
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.3),
                color: "white",
                p: { xs: 0.5, sm: 0.75 },
                borderRadius: 1,
                minWidth: { xs: 28, sm: 32 },
                textAlign: "center",
              }}
            >
              #
            </Box>
            Units
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.3),
                color: "white",
                p: { xs: 0.5, sm: 0.75 },
                borderRadius: 1,
                minWidth: { xs: 28, sm: 32 },
                textAlign: "center",
              }}
            >
              R
            </Box>
            Rolls
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.3),
                color: "white",
                p: { xs: 0.5, sm: 0.75 },
                borderRadius: 1,
                minWidth: { xs: 28, sm: 32 },
                textAlign: "center",
              }}
            >
              g
            </Box>
            Grams
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
