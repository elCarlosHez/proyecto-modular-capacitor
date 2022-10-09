import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBackend } from "../hooks/fetchBackend";

export const UserData = () => {
    const [name, setName] = useState('Cargando...');
    const [salary, setSalary] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            const data = await fetchBackend('/api/user', {}, 'GET');
            setName(data.name);
            setSalary(data.salary);
        };

        getUserData();
    }, []);

    const updateUserData = async () => {
        try {
            await fetchBackend('/api/user', {
                name,
                salary,
            });
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid justifyContent="center" px={4}>
            <Typography variant="h4" mt={3}>Hola {name}!</Typography>
            <Typography mb={2}>Puedes actualizar tus datos escribiendo los datos nuevos y presionando el botón de guardar.</Typography>
            <TextField
                fullWidth={true}
                label="Escribe tu nombre"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <TextField
                fullWidth={true}
                label="Escribe tu ingreso mensual bruto (con impuestos)"
                variant="outlined"
                margin="normal"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={salary}
                onChange={(event) => {
                    setSalary(parseFloat(event.target.value));
                }}
            />
            <Box mt={2} mb={2}>
                <Button fullWidth={true} variant="contained" onClick={() => updateUserData()} >
                    Guardar cambios
                </Button>
            </Box>
            <Box mb={3}>
                <Button fullWidth={true} variant="outlined" onClick={() => navigate('/perfil')} >
                    Regresar
                </Button>
            </Box>
        </Grid>
    )
}