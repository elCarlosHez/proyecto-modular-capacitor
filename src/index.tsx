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
import { Perfil } from "./pages/Perfil";
import { AuthProvider } from "./contexts/AuthContext";
import { UpdateDeductions } from "./pages/UpdateDeductions";
import { Login } from "./pages/Login";
import { Investments } from "./pages/Investments";
import { InvestmentProvider } from "./contexts/InvestmentContext";
import { InvestmentProjection } from "./pages/InvestmentProjection";
import { UserData } from "./pages/UserData";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#6750A4',
    },
    secondary: {
      main: '#79747E',
    },
  },
  typography: {
    h4: {
      color: '#6750A4',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
        }
      }
    }
  }
});


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <InvestmentProvider>
              <BrowserRouter>
                <Routes>
                  <Route index element={<Onboarding />} />
                  <Route path="presupuesto" element={<IncomesAndExpenses />} />
                  <Route path="/presupuesto/agregar-ingreso" element={<CreateIncome />} />
                  <Route path="/presupuesto/agregar-gasto" element={<CreateExpense />} />
                  <Route path="impuestos" element={<TaxesView />} />
                  <Route path="/impuestos/modificar-deducciones" element={<UpdateDeductions />} />
                  <Route path="perfil" element={<Perfil />} />
                  <Route path="/perfil/actualizar-datos" element={<UserData />} />
                  <Route path="login" element={<Login />} />
                  <Route path="estrategias" element={<Investments />} />
                  <Route path="/estrategias/proyeccion" element={<InvestmentProjection />} />
                </Routes>
              </BrowserRouter>
            </InvestmentProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CssBaseline>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
