import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { App } from "./App";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Savings, DirectionsCar, AssuredWorkload } from "@mui/icons-material";
import { CreateIncome } from "./pages/CreateIncome";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <CreateIncome />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Finanzas" icon={<Savings />} />
            <BottomNavigationAction label="Metas" icon={<DirectionsCar />} />
            <BottomNavigationAction
              label="Impuestos"
              icon={<AssuredWorkload />}
            />
          </BottomNavigation>
        </Paper>
      </LocalizationProvider >
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById("root")
);
