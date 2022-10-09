import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const UserProfile = () => {
    const { logoutUser } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {
        await logoutUser();
        navigate('/perfil');
    } 

    return (
        <>
            <Typography variant="h4" my={5}>Perfil</Typography>
            <Box mt={2}>
                <Button onClick={() => navigate('/perfil/actualizar-datos')} fullWidth={true} variant="contained" >
                    Actualizar Datos
                </Button>
            </Box>
            <Box mt={3} mb={1}>
                <Button onClick={logout} fullWidth={true} variant="outlined" >
                    Cerrar sesión
                </Button>
            </Box>
        </>
    );
};