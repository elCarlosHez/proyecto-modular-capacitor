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
import { currencyFormat } from "../utils/currencyFormat";

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
  const [resume, setResume] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let response = await fetchBackend("/api/expense", {}, "GET");
      setData(response);
    };

    const getResume = async () => {
      let resume = await fetchBackend("/api/expense/resume", {}, "GET");
      setResume(resume);
    }

    getResume();
    getData();
  }, []);

  return (
    <PrincipalPage>
      <Typography textAlign="center" mt={5} variant="h3" component="h1">
        {currencyFormat.format(resume)}
      </Typography>
      <Typography
        textAlign="center"
        mt={2}
        mb={4}
        variant="body1"
        component="p"
      >
        Presupuesto
      </Typography>
      {
        Object.keys(data).map((key: string, index) => {
          return (
            <>
              <MonthTitle key={`title-${index}`} title={key} />
              {
                // @ts-ignore
                data[key].map(item =>
                  <ExpenseOrIncome
                    type={"income"}
                    title={item.name}
                    date={new Date(item.expense_date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
                    price={item.amount}
                  />
                )
              }
            </>
          );
        })
      }
      <Box my={4}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={() => {
            navigate("agregar-gasto");
          }}
        >
          Agregar gasto
        </Button>
      </Box>
    </PrincipalPage>
  );
};
