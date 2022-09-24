import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { fetchBackend } from "../hooks/fetchBackend";
import { useNavigate } from "react-router-dom";

export const CreateExpense = () => {
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [type, setType] = useState<string>();
  const [periodicity, setPeriodicity] = useState<string>('diario');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveExpense = async () => {
    setLoading(true);
    await fetchBackend("/api/expense", {
      name,
      amount,
      type,
      periodicity,
      expense_date: expenseDate,
    });
    navigate('/presupuesto');
  };

  return (
    <Grid px={4}>
      <Typography variant="h4" my={5}>
        Agregar gasto
      </Typography>
      <TextField
        fullWidth={true}
        label="Nombre del gasto"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <TextField
        fullWidth={true}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        label="Cantidad"
        variant="outlined"
        type="number"
        margin="normal"
        value={amount}
        onChange={(event) => {
          setAmount(parseFloat(event.target.value));
        }}
      />
      <FormControl margin="normal">
        <FormLabel id="demo-row-radio-buttons-group-label">
          Tipo de ingreso
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="unico"
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <FormControlLabel
            value="recurrent"
            control={<Radio />}
            label="Recurrente"
          />
          <FormControlLabel value="unique" control={<Radio />} label="Único" />
        </RadioGroup>
      </FormControl>
      {type === "recurrent" && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="periodicity-label">Frecuencia del gasto</InputLabel>
          <Select
            labelId="periodicity-label"
            label="Frecuencia del gasto"
            onChange={(event) => {
              setPeriodicity(event.target.value);
            }}
            value={periodicity}
          >
            <MenuItem value="diario">Diario</MenuItem>
            <MenuItem value="semanal">Semanal</MenuItem>
            <MenuItem value="quincenal">Quincenal</MenuItem>
            <MenuItem value="mensual">Mensual</MenuItem>
            <MenuItem value="semestral">Semestral</MenuItem>
            <MenuItem value="anual">Anual</MenuItem>
          </Select>
        </FormControl>
      )}

      <MobileDatePicker
        label="Fecha del gasto"
        inputFormat="dd/MM/yyyy"
        value={expenseDate}
        onChange={(newValue: any) => {
          setExpenseDate(new Date(newValue));
        }}
        renderInput={(params: any) => (
          <TextField fullWidth={true} margin="normal" {...params} />
        )}
      />
      <Box mt={2}>
        <LoadingButton
          loading={loading}
          fullWidth={true}
          variant="contained"
          onClick={saveExpense}
        >
          Añadir gasto
        </LoadingButton>
      </Box>
      <Box mt={1}>
        <Button
          fullWidth={true}
          variant="outlined"
          onClick={() => navigate('/presupuesto')}
        >
          Regresar
        </Button>
      </Box>
    </Grid>
  );
};
