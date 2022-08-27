import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";

export const UserProfile = () => {
    const { logoutUser } = useAuthContext();

    return (
        <>
            <Typography variant="h4" my={5}>Perfil</Typography>
            <Box mt={2} mb={1}>
                <Button onClick={() => logoutUser} fullWidth={true} variant="contained" >
                    Cerrar sesión
                </Button>
            </Box>
        </>
    );
};