import { Box, Grid, Typography } from "@mui/material";
import { Paid, PointOfSale } from "@mui/icons-material";

export type ExpenseOrIncomeType = "income" | "expense";

interface IExpenseOrIncome {
  type: ExpenseOrIncomeType;
  title: string;
  date: string;
  price: string | number;
}

export const ExpenseOrIncome = (props: IExpenseOrIncome) => {
  const { type, title, date, price } = props;

  const iconToShow = type === "income" ? <Paid fontSize="large" /> : <PointOfSale fontSize="large" />;

  return (
    <Grid display="flex" flexDirection="row" width="100%" alignItems="center" mb={2}>
      <Box pr={3}>
        <Grid display="flex" justifyContent="center" alignItems="center">
          {iconToShow}
        </Grid>
      </Box>
      <Grid flexDirection="column" width="70%">
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body2">{date}</Typography>
      </Grid>
      <Box>
        <Typography variant="h5">${price}</Typography>
      </Box>
    </Grid>
  );
};
