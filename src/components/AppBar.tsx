import * as React from "react";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MoreVert } from "@mui/icons-material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

export function AppBar() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <MuiAppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
            }}
          >
            <PointOfSaleIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cashier Count
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{}}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
