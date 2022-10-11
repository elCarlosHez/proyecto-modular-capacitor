import { AssuredWorkload, DirectionsCar, Person, Savings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFindPath } from "../utils/useFindPatch";

interface IPrincipalPage {
    children: React.ReactNode;
}

export const PrincipalPage = (props: IPrincipalPage) => {
    const navigation = useNavigate();
    const [activeSection, SetActiveSection] = useState(0);
    const path = useFindPath();
    useEffect(() => {
        if (path) {
            switch (path) {
                case '/presupuesto':
                    SetActiveSection(0);
                    break;
                case '/estrategias':
                    SetActiveSection(1);
                    break;
                case '/impuestos':
                    SetActiveSection(2);
                    break;
                case '/perfil':
                    SetActiveSection(3);
                    break;
            }
        }
    }, [path]);

    return (
        <Grid justifyContent="center" px={4}>
            {props.children}
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={activeSection}
                >
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