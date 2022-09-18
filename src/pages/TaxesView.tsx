import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBackend } from "../hooks/fetchBackend";
import { PrincipalPage } from "../layout/PrincipalPage";
import { currencyFormat } from "../utils/currencyFormat";

export const TaxesView = (): JSX.Element => {
    const [data, setData] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        const getDataFromBackend = async () => {
            const data = await fetchBackend('/api/taxes', {}, 'GET');
            setData(data);
        };
        try {
            getDataFromBackend();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const UpdateDeductions = (): void => {
        navigate('/impuestos/modificar-deducciones');
    };

    return (
        <PrincipalPage>
            <Typography variant="h4" my={5}>
                Impuestos
            </Typography>
            <Typography textAlign="center" mt={5} variant="h5" component="h2">
                {data ? `$${data.balance}` : 'Cargando ...'}
            </Typography>
            <Typography textAlign="center" mt={2} component="p">
                Saldo a favor
            </Typography>
            <Typography textAlign="left" mt={2} component="p">
                Ingreso anual: {currencyFormat.format(data?.ingreso_bruto)}<br />
                Impuesto detenido: {currencyFormat.format(data?.impuesto_determinado)}<br />
                Tasa de impuestos: {data?.tasa * 100}%
            </Typography>
            <Box mt={4}>
                <Typography mb={2} fontWeight="bold">
                    Resumen de deducciones
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Concepto</TableCell>
                                <TableCell align="left">Monto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Gastos Médicos</TableCell>
                                <TableCell align="left">{currencyFormat.format(data?.deducciones.medical)}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Ahorro para el retiro</TableCell>
                                <TableCell align="left">{currencyFormat.format(data?.deducciones.retirement)}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Donaciones</TableCell>
                                <TableCell align="left">{currencyFormat.format(data?.deducciones.donation)}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Educación</TableCell>
                                <TableCell align="left">{currencyFormat.format(data?.deducciones.education)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box mt={2}>
                    <Button onClick={UpdateDeductions} fullWidth={true} variant="contained" >
                        Modificar las deducciones
                    </Button>
                </Box>
            </Box>
        </PrincipalPage>
    )
};

