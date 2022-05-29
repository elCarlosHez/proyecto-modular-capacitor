import { Typography } from "@mui/material";

interface IMonthTitle {
  title: string;
}

export const MonthTitle = (props: IMonthTitle) => {
  const { title } = props;

  return <Typography variant="h5" mb={3} >{title}</Typography>
}
