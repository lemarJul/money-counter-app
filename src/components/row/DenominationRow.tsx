import { Grid, Typography, Box, Stack, alpha } from "@mui/material";
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
}: DenominationRowProps) => {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: { xs: 1, sm: 2 },
        py: 1,
        borderBottom: 1,
        borderColor: "divider",
        "&:hover": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
        },
        "& > *": {
          flex: 1,
        },
      }}
    >
      {[
        {
          xs: 3,
          content: (
            <Stack direction="row" alignItems="center">
              <Box>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  sx={{
                    fontSize: "1.125rem",
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
                  }}
                >
                  x {totalUnits}
                </Typography>
              </Box>
            </Stack>
          ),
        },
        {
          xs: 3,
          content: (
            <NumberInput
              value={counterSet.unit.count}
              onChange={(value) => setCount("unit", value)}
            />
          ),
        },
        {
          xs: 3,
          content: counterSet.roll ? (
            <NumberInput
              value={counterSet.roll.count}
              onChange={(value) => setCount("roll", value)}
            />
          ) : (
            <Box />
          ),
        },
        {
          xs: 3,
          content: counterSet.weight ? (
            <NumberInput
              value={counterSet.weight.count}
              onChange={(value) => setCount("weight", value)}
            />
          ) : (
            <Box />
          ),
        },
      ]
        .filter(Boolean)
        .map((item, index) => {
          if (!item) return null;
          return (
            <Grid item key={index} xs={item.xs}>
              {item.content}
            </Grid>
          );
        })}
    </Stack>
  );
};
