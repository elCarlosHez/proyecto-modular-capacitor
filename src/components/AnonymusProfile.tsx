import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchBackend } from "../hooks/fetchBackend";

export const AnonymusProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [modal, setModal] = useState(false);
    const { signupUser } = useAuthContext();

    const registrarUsuario = async () => {
        if (password === confirmPassword) {
            try {
                const user = await signupUser(email, password);
                await fetchBackend('/api/migrate-user', {
                    'firebaseUID': user?.uid
                }, 'POST');
                setModal(true);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Typography variant="h4" my={5}>
                Crea una cuenta
            </Typography>
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
            <TextField
                fullWidth={true}
                label="Confirma tu contraseña"
                variant="outlined"
                type="password"
                margin="normal"
                value={confirmPassword}
                onChange={(event) => {
                    setconfirmPassword(event.target.value);
                }}
            />
            <Box mt={2} mb={1}>
                <Button onClick={registrarUsuario} fullWidth={true} variant="contained" >
                    Registrarme
                </Button>
            </Box>
            <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
            <Snackbar open={modal} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    ¡Tu cuenta ha sido creada con éxito!
                </Alert>
            </Snackbar>
        </>
    );
}