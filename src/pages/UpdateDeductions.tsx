import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBackend } from "../hooks/fetchBackend";

export const UpdateDeductions = (): JSX.Element => {
    const navigate = useNavigate();
    const [medical, setMedical] = useState(0);
    const [retirement, setRetirement] = useState(0);
    const [donation, setDonation] = useState(0);
    const [education, setEducation] = useState(0);

    useEffect(() => {
        const fetchDeductions = async () => {
            const data = await fetchBackend('/api/deductions', {}, 'GET');
            setMedical(data.medical);
            setRetirement(data.retirement);
            setDonation(data.donation);
            setEducation(data.education);
        };

        fetchDeductions();
    }, []);

    const updateData = async () => {
        try {
            await fetchBackend('/api/deductions', {
                medical,
                retirement,
                donation,
                education,
            });
            navigate('/impuestos');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Grid justifyContent="center" px={4}>
            <Typography variant="h4" my={5}>
                Modificar mis deducciones
            </Typography>
            <TextField
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                label="Gastos Médico"
                variant="outlined"
                type="number"
                margin="normal"
                value={medical}
                onChange={(event) => {
                    setMedical(parseFloat(event.target.value));
                }}
            />
            <TextField
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                label="Ahorro para el retiro"
                variant="outlined"
                type="number"
                margin="normal"
                value={retirement}
                onChange={(event) => {
                    setRetirement(parseFloat(event.target.value));
                }}
            />
            <TextField
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                label="Donaciones"
                variant="outlined"
                type="number"
                margin="normal"
                value={donation}
                onChange={(event) => {
                    setDonation(parseFloat(event.target.value));
                }}
            />
            <TextField
                fullWidth={true}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                label="Educación"
                variant="outlined"
                type="number"
                margin="normal"
                value={education}
                onChange={(event) => {
                    setEducation(parseFloat(event.target.value));
                }}
            />
            <Box mt={3} mb={2}>
                <Button fullWidth={true} variant="contained" onClick={updateData} >
                    Guardar
                </Button>
            </Box>
            <Button fullWidth={true} variant="outlined" onClick={() => navigate('/impuestos')}>
                Regresar
            </Button>
        </Grid>
    );
}