import {
  IconButton,
  Paper,
  Typography,
  Stack,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import type { ICurrencyMetadata } from "../data/Money.types";

interface TotalDisplayProps {
  total: number;
  currencyMetaData: ICurrencyMetadata;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const TotalDisplay = ({
  total,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  currencyMetaData,
}: TotalDisplayProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 1, sm: 2 },
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "background.paper"
            : "background.default",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        sx={{ width: "100%" }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            p: { xs: 2, sm: 4 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.dark",
            color: "white",
            borderRadius: 2,
            // boxShadow: (theme) =>
            //   `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
            // transition: "all 0.3s ease",
            // "&:hover": {
            //   transform: { xs: "none", sm: "scale(1.02)" },
            //   boxShadow: (theme) =>
            //     `0 12px 48px ${alpha(theme.palette.primary.main, 0.5)}`,
            // },
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              letterSpacing: 2,
              fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {total.toFixed(2)} {currencyMetaData.symbol}
          </Typography>
        </Paper>
        <Stack
          direction="row"
          spacing={1}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: 160 },
          }}
        >
          <Tooltip title="Undo" arrow>
            <span>
              <IconButton
                onClick={onUndo}
                disabled={!canUndo}
                size="large"
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  transition: "all 0.2s",
                  "& .MuiSvgIcon-root": {
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  },
                  "&:not(:disabled):hover": {
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: "white",
                  },
                }}
              >
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Redo" arrow>
            <span>
              <IconButton
                onClick={onRedo}
                disabled={!canRedo}
                size="large"
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  transition: "all 0.2s",
                  "& .MuiSvgIcon-root": {
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  },
                  "&:not(:disabled):hover": {
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: "white",
                  },
                }}
              >
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Reset" arrow>
            <IconButton
              onClick={onReset}
              size="large"
              sx={{
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                transition: "all 0.2s",
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                },
                "&:hover": {
                  bgcolor: (theme) => theme.palette.error.main,
                  color: "white",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};
