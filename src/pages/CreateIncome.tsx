import {
  Box,
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

export const CreateIncome = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [type, setType] = useState<string>();
  const [periodicity, setPeriodicity] = useState<string>();
  const [loading, setLoading] = useState(false);

  const saveIncome = async () => {
    setLoading(true);
    await fetchBackend("/api/new-income", {
      name,
      amount,
      type,
      periodicity,
      date,
    });
  };

  return (
    <Grid px={4}>
      <Typography variant="h4" my={5}>
        Agregar ingreso
      </Typography>
      <TextField
        fullWidth={true}
        label="Nombre del ingreso"
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
          //endAdornment: <Cancel />,
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
        label="Fecha del ingreso"
        inputFormat="dd/MM/yyyy"
        value={date}
        onChange={(newValue: any) => {
          setDate(new Date(newValue));
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
          onClick={saveIncome}
        >
          Añadir ingreso
        </LoadingButton>
      </Box>
    </Grid>
  );
};
