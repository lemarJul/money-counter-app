import { IconButton, Stack, Box } from "@mui/material";
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface ActionsProps {
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Actions = ({
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: ActionsProps) => {
  const buttonStyle = {
    flex: 1,
    border: 1,
    borderColor: "divider",
    width: { xs: 48, sm: 60 },
    height: { xs: 48, sm: 60 },
    margin: { xs: 1, sm: 2 },
    transition: "all 0.2s",
    "& .MuiSvgIcon-root": {
      fontSize: { xs: "1.5rem", sm: "1.75rem" },
    },
    borderRadius: 1,
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: 2,
        display: "flex",
        borderTop: 1,
        borderColor: "divider",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // bgcolor: (theme) => theme.palette.background.paper,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          minWidth: { sm: 160 },
        }}
      >
        <IconButton
          onClick={onUndo}
          disabled={!canUndo}
          size="large"
          aria-label="undo"
          sx={{
            ...buttonStyle,
            bgcolor: (theme) => theme.palette.primary.dark,
            color: "white",
            "&:not(:disabled):hover": {
              bgcolor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          onClick={onRedo}
          disabled={!canRedo}
          size="large"
          aria-label="redo"
          sx={{
            ...buttonStyle,
            bgcolor: (theme) => theme.palette.primary.dark,
            color: "white",
            "&:not(:disabled):hover": {
              bgcolor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <RedoIcon />
        </IconButton>

        <IconButton
          onClick={onReset}
          size="large"
          aria-label="reset"
          sx={{
            ...buttonStyle,
            bgcolor: (theme) => theme.palette.primary.dark,
            color: "white",
            "&:hover": {
              bgcolor: (theme) => theme.palette.error.dark,
              color: "white",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
