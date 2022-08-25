import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  ExpenseOrIncome,
  ExpenseOrIncomeType,
} from "../components/ExpenseOrIncome";
import { MonthTitle } from "../components/MonthTitle";
import { fetchBackend } from "../hooks/fetchBackend";
import { useNavigate } from "react-router-dom";
import { PrincipalPage } from "../layout/PrincipalPage";

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

export const IncomesAndExpenses = (): JSX.Element => {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    // const getData = async () => {
    //   let response = await fetchBackend("/api/income", {}, "GET");
    //   setData(response);
    // };
    // getData();
  }, []);

  return (
    <PrincipalPage>
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
      {data.map((item: any) => (
        <ExpenseOrIncome
          type={"income"}
          title={item.name}
          date={item.income_date}
          price={item.amount}
        />
      ))}
      {fakeData.map((data) => (
        <ExpenseOrIncome
          type={data.type as ExpenseOrIncomeType}
          title={data.title}
          date={data.date}
          price={data.price}
        />
      ))}
      <Box mt={5} mb={2}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={() => {
            navigate("/agregar-ingreso");
          }}
        >
          Agregar ingreso
        </Button>
      </Box>
      <Button
        fullWidth={true}
        variant="outlined"
        onClick={() => {
          navigate("/agregar-gasto");
        }}
      >
        Agregar gasto
      </Button>
    </PrincipalPage>
  );
};
