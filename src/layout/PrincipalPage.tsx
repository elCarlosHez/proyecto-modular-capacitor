import { AssuredWorkload, DirectionsCar, Person, Savings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Paper } from "@mui/material";

interface IPrincipalPage {
    children: React.ReactNode;
}

export const PrincipalPage = (props: IPrincipalPage) => {
    return (
        <Grid justifyContent="center" px={4}>
            {props.children}
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Finanzas" icon={<Savings />} />
                    <BottomNavigationAction label="Metas" icon={<DirectionsCar />} />
                    <BottomNavigationAction
                        label="Impuestos"
                        icon={<AssuredWorkload />}
                    />
                    <BottomNavigationAction label="Perfil" icon={<Person />} />
                </BottomNavigation>
            </Paper>
        </Grid>
    );
}