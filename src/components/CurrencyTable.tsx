import { Stack } from "@mui/material";

import { DenominationRow } from "./row/DenominationRow"; // Assuming this component is defined elsewhere
import { ICurrencyMetadata } from "../data/Money.types";
import { IDenominationCounter } from "../modules/DenominationCounter.types";

interface CurrencyTableProps {
  currencyMetaData: ICurrencyMetadata;
  tillCount: IDenominationCounter[];
  updateTillCount: (
    index: number,
    counterKey: keyof IDenominationCounter["counterSet"],
    newValue: number
  ) => void;
}

export const CurrencyTable: React.FC<CurrencyTableProps> = ({
  tillCount,
  updateTillCount,
  currencyMetaData,
}) => {
  return (
    <Stack
      // spacing={1}
      sx={{
        overflow: "scroll",
        bgcolor: "background.default",
      }}
    >
      {tillCount.map((denomination, index) => {
        return (
          <DenominationRow
            key={denomination.denomination.id}
            label={denomination.formattedValue}
            totalUnits={denomination.totalUnits}
            counterSet={denomination.counterSet}
            currencyMetaData={currencyMetaData}
            setCount={(counterKey, newValue) =>
              updateTillCount(index, counterKey, newValue)
            }
          />
        );
      })}
    </Stack>
  );
};

export default CurrencyTable;
