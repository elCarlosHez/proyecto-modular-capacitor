import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Savings, DirectionsCar, AssuredWorkload } from "@mui/icons-material";
import { CreateIncome } from "./pages/CreateIncome";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { IncomesAndExpenses } from "./pages/IncomesAndExpenses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateExpense } from "./pages/CreateExpense";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <BrowserRouter>
            <Routes>
              <Route index element={<IncomesAndExpenses />} />
              <Route path="/agregar-ingreso" element={<CreateIncome />} />
              <Route path="/agregar-gasto" element={<CreateExpense />} />
            </Routes>
          </BrowserRouter>
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
        </LocalizationProvider>
      </CssBaseline>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
