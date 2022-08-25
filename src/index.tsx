import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { CreateIncome } from "./pages/CreateIncome";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IncomesAndExpenses } from "./pages/IncomesAndExpenses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateExpense } from "./pages/CreateExpense";
import { TaxesView } from "./pages/TaxesView";
import { Onboarding } from "./pages/Onboarding";
import { AuthProvider } from "./contexts/AuthContext";
import { UpdateDeductions } from "./pages/UpdateDeductions";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Onboarding />} />
              <Route path="presupuesto" element={<IncomesAndExpenses />}>
                <Route path="agregar-ingreso" element={<CreateIncome />} />
                <Route path="agregar-gasto" element={<CreateExpense />} />
              </Route>
              <Route path="impuestos" element={<TaxesView />} />
              <Route path="/impuestos/modificar-deducciones" element={<UpdateDeductions />} />
            </Routes>
          </BrowserRouter>

        </LocalizationProvider>
      </CssBaseline>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
