import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  ExpenseOrIncome,
  ExpenseOrIncomeType,
} from "./components/ExpenseOrIncome";
import { MonthTitle } from "./components/MonthTitle";

const fakeData = [
  {
    type: "income",
    title: "Un tiutlo",
    date: "17 de julio",
    price: 999,
  },
  {
    type: "expense",
    title: "Un tiutlo",
    date: "17 de julio",
    price: 999,
  },
];

export const App = (): JSX.Element => {
  return (
    <Grid justifyContent="center" px={4}>
      <Typography textAlign="center" mt={5} variant="h2" component="h1">
        $700
      </Typography>
      <Typography
        textAlign="center"
        mt={2}
        mb={4}
        variant="body2"
        component="p"
      >
        Presupuesto
      </Typography>
      <MonthTitle title="Julio 2022" />
      {fakeData.map((data) => (
        <ExpenseOrIncome
          type={data.type as ExpenseOrIncomeType}
          title={data.title}
          date={data.date}
          price={data.price}
        />
      ))}
      <Box mt={5} mb={2}>
        <Button fullWidth={true} variant="contained">
          Agregar ingreso
        </Button>
      </Box>
      <Button fullWidth={true} variant="outlined">
        Agregar gasto
      </Button>
    </Grid>
  );
};
