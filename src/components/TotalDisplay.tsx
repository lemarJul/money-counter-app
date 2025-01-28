import { Box, IconButton, Paper, Typography, Stack } from "@mui/material";
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface TotalDisplayProps {
  total: number;
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
}: TotalDisplayProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        p: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{total.toFixed(2)} €</Typography>
      </Paper>
      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
          size="large"
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
          size="large"
        >
          <RedoIcon />
        </IconButton>
        <IconButton onClick={onReset} title="Reset" size="large" color="error">
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
