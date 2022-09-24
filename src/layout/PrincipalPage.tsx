import { AssuredWorkload, DirectionsCar, Person, Savings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IPrincipalPage {
    children: React.ReactNode;
}

export const PrincipalPage = (props: IPrincipalPage) => {
    const navigation = useNavigate();
    return (
        <Grid justifyContent="center" px={4}>
            {props.children}
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Finanzas" onClick={() => navigation('/presupuesto')} icon={<Savings />} />
                    <BottomNavigationAction label="Estrategias" onClick={() => navigation('/estrategias')} icon={<DirectionsCar />} />
                    <BottomNavigationAction
                        onClick={() => navigation('/impuestos')}
                        label="Impuestos"
                        icon={<AssuredWorkload />}
                    />
                    <BottomNavigationAction onClick={() => navigation('/perfil')} label="Perfil" icon={<Person />} />
                </BottomNavigation>
            </Paper>
        </Grid>
    );
}