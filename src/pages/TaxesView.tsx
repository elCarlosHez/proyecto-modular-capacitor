import { QuestionMarkOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBackend } from "../hooks/fetchBackend";
import { PrincipalPage } from "../layout/PrincipalPage";
import { currencyFormat } from "../utils/currencyFormat";

export const TaxesView = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorSaldos, setAnchorSaldos] = useState<HTMLButtonElement | null>(null);
    const [data, setData] = useState<any>();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickSaldos = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorSaldos(event.currentTarget);
    };

    const handleCloseSaldos = () => {
        setAnchorSaldos(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'saldo-a-favor-popup' : undefined;

    const openSaldos = Boolean(anchorSaldos);
    const idSaldos = open ? 'saldos-popup' : undefined;

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
                Saldo a favor <Box padding={0} component="span"><Button onClick={handleClick} style={{ padding:0, minWidth:0 }} variant="contained" ><QuestionMarkOutlined /></Button></Box>
            </Typography>
            <Box mt={2} mb={1}>
                <Typography fontWeight="bold">
                    Resumen de tus saldos: <Box padding={0} component="span"><Button onClick={handleClickSaldos} style={{ padding:0, minWidth:0 }} variant="contained" ><QuestionMarkOutlined /></Button></Box>
                </Typography>
            </Box>
            <Typography textAlign="left" mt={2} component="p">
                Ingreso anual: {currencyFormat.format(data?.ingreso_bruto)}<br />
                Impuesto detenido: {currencyFormat.format(data?.impuesto_determinado)}<br />
                Tasa de impuestos: {data?.tasa * 100}%
            </Typography>
            <Box mt={4}>
                <Box mb={2}>
                    <Typography fontWeight="bold">
                        Resumen de tus deducciones
                    </Typography>
                </Box>
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Son los impuestos que se te han retenido. Puedes tener un saldo negativo o positivo que verás en tu declaración anual.</Typography>
            </Popover>
            <Popover
                id={idSaldos}
                open={openSaldos}
                anchorEl={anchorSaldos}
                onClose={handleCloseSaldos}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Se te cobrá una tasa de impuestos dependiendo de tus ingresos. Después a tus ingresos totales se les resta las deducciones para determinar si tienes un saldo a favor.</Typography>
            </Popover>
        </PrincipalPage>
    )
};

