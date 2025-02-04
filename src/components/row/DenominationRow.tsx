import { Grid, Typography, Box, Card, Stack, alpha } from "@mui/material";
import { NumberInput } from "./NumberInput";
import {
  IDenominationCounter,
  counterSetType,
} from "../../modules/DenominationCounter.types";
import type { ICurrencyMetadata } from "../../data/Money.types";

interface DenominationRowProps {
  label: string;
  totalUnits: number;
  counterSet: counterSetType;
  currencyMetaData: ICurrencyMetadata;
  setCount: (
    counterKey: keyof IDenominationCounter["counterSet"],
    newValue: number
  ) => void;
}

export const DenominationRow = ({
  label,
  totalUnits,
  counterSet,
  setCount,
  // currencyMetaData,
}: DenominationRowProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        mb: { xs: 0.5, sm: 1 },
        mx: { xs: 0.5, sm: 1 },
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03),
        },
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        alignItems="center"
        sx={{
          p: { xs: 0.75, sm: 1 },
        }}
      >
        <Grid item xs={3}>
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            alignItems="center"
          >
            {/* <Box
              sx={{
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: (theme) => theme.palette.primary.main,
                p: { xs: 0.5, sm: 0.75 },
                borderRadius: 1,
                minWidth: { xs: 24, sm: 28 },
                textAlign: "center",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: "medium",
              }}
            >
              {currencyMetaData.symbol}
            </Box> */}
            <Box>
              <Typography
                variant="body1"
                fontWeight="medium"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  lineHeight: 0.75,
                }}
              >
                {label}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                }}
              >
                x {totalUnits}
              </Typography>
            </Box>
          </Stack>
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
    </Card>
  );
};
