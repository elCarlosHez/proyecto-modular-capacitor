import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchBackend } from "../hooks/fetchBackend";

export const Onboarding = (): JSX.Element => {
    const { isTempUser } = useAuthContext();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [salary, setSalary] = useState('');
    const [salaryError, setSalaryError] = useState(false);
    let navigate = useNavigate();

    const checkData = (): boolean => {
        let wasAnError = false;
        if (!name.length) {
            setNameError(true);
            wasAnError = true;
        }
        if (!salary.length) {
            setSalaryError(true);
            wasAnError = true;
        }
        return wasAnError;
    };

    const sentForm = async (): Promise<void> => {
        if (!!checkData()) {
            return;
        }
        try {
            await fetchBackend("/api/onboarding", {
                name,
                salary,
            });
            localStorage.setItem('onboarding_done', "true");
            navigate('/impuestos');
        } catch (error) {
            console.log(error);
            return;
        }
    };

    useEffect(() => {
        if(localStorage.getItem('onboarding_done')){
            navigate('/impuestos');
        }
    }, []);

    return (
        <Grid justifyContent="center" px={4}>
            <Typography variant="h4" mt={3}>Hola!</Typography>
            <Typography mb={2}>Antes de continuar nos gustaría saber un poco más de ti.</Typography>
            <TextField
                fullWidth={true}
                label="¿Cuál es tu nombre? *"
                variant="outlined"
                margin="normal"
                error={nameError}
                helperText={!!nameError && "Este cambo es requerido."}
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <TextField
                fullWidth={true}
                label="¿Cuál es tu ingreso mensual bruto? * (con impuestos)"
                variant="outlined"
                margin="normal"
                error={salaryError}
                helperText={!!salaryError && "Este cambo es requerido."}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={salary}
                onChange={(event) => {
                    setSalary(event.target.value);
                }}
            />
            <Box mt={2} mb={3}>
                <Button fullWidth={true} variant="contained" onClick={() => sentForm()} >
                    Continuar
                </Button>
            </Box>
            <Link to="/login">¿Ya tienes una cuenta?</Link>
        </Grid>
    );
}