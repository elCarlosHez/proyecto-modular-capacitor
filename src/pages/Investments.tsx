import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvestmentContext } from "../contexts/InvestmentContext";
import { fetchBackend } from "../hooks/fetchBackend";
import { PrincipalPage } from "../layout/PrincipalPage";

export const Investments = (): JSX.Element => {
    //    const [name, setName] = useState('');
    const { money, name, saving, investment, earnings, setEarnings, setInvestment, setMoney, setName, setSaving } = useInvestmentContext();
    const [time, setTime] = useState('');
    const [risk, setRisk] = useState('');
    // const [money, setMoney] = useState('');
    // const [saving, setSaving] = useState('');
    const navigate = useNavigate();

    const getInvesmentStrategy = async () => {
        try {
            const result = await fetchBackend('/api/investment', {
                name,
                time,
                risk,
                money,
                saving,
            }, 'POST');
            setInvestment(result.investment);
            setEarnings(result.earnings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(investment && earnings){
            navigate('/estrategias/proyeccion');
        }
    }, [investment, earnings]);

    return (
        <PrincipalPage>
            <Typography variant="h4" my={5}>Estrategias de ahorro e inversión</Typography>
            <TextField
                fullWidth={true}
                label="¿Cómo se llama tu estrategia?"
                variant="outlined"
                type="string"
                margin="normal"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="periodicity-label">Plazo de la estrategia</InputLabel>
                <Select
                    labelId="periodicity-label"
                    label="Plazo de la estrategia"
                    onChange={(event) => {
                        setTime(event.target.value);
                    }}
                    value={time}
                >
                    <MenuItem value="1">Corto plazo (1 mes - 1 año )</MenuItem>
                    <MenuItem value="2">Mediano Plazo (1 año - 5 años)</MenuItem>
                    <MenuItem value="3">Largo plazo (5 años o más)</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="periodicity-label">¿Cuál es tu tolerancia al riesgo?</InputLabel>
                <Select
                    labelId="periodicity-label"
                    label="¿Cuál es tu tolerancia al riesgo?"
                    onChange={(event) => {
                        setRisk(event.target.value);
                    }}
                    value={risk}
                >
                    <MenuItem value="1">Bajo, no me gustaría perder dinero.</MenuItem>
                    <MenuItem value="2">Mediano, puedo tolerar caídas del 30%.</MenuItem>
                    <MenuItem value="3">Alto, no me importa tener caídas mayores al 50%</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth={true}
                label="¿Con cuánto dinero comenzaras?"
                variant="outlined"
                type="number"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                margin="normal"
                value={money}
                onChange={(event) => {
                    setMoney(parseFloat(event.target.value));
                }}
            />
            <TextField
                fullWidth={true}
                label="¿Cuánto te gustaría ahorrar al mes?"
                variant="outlined"
                type="number"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                margin="normal"
                value={saving}
                onChange={(event) => {
                    setSaving(parseFloat(event.target.value));
                }}
            />
            <Box mt={2}>
                <LoadingButton
                    loading={false}
                    fullWidth={true}
                    variant="contained"
                    onClick={getInvesmentStrategy}
                >
                    Obtener mi estrategia
                </LoadingButton>
            </Box>
        </PrincipalPage>
    );
}