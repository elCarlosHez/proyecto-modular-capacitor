import { Typography } from "@mui/material";
import { translateMonth } from "../utils/translateMonth";

interface IMonthTitle {
  title: string;
}

export const MonthTitle = (props: IMonthTitle) => {
  const { title } = props;
  const [month, year] = title.split(' ');

  return <Typography variant="h5" mb={3}>{`${translateMonth(month)} ${year}`}</Typography>
}
