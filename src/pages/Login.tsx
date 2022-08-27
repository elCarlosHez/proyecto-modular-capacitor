import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <Grid justifyContent="center" px={4}>
            <Typography variant="h4" my={5}>Ingresa a tu cuenta</Typography>
            <TextField
                fullWidth={true}
                label="Escribe tu correo"
                variant="outlined"
                type="email"
                margin="normal"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <TextField
                fullWidth={true}
                label="Escribe tu contraseña"
                variant="outlined"
                type="password"
                margin="normal"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <Box mt={2}>
                <Button onClick={() => { }} fullWidth={true} variant="contained" >
                    Ingresar
                </Button>
            </Box>
            <Button onClick={() => navigate(-1)} fullWidth={true} variant="contained" >
                Regresar
            </Button>
        </Grid>
    );
};