import { Card, CardContent, CardHeader, CardActions, Typography, Button, Grid, Box } from "@mui/material";
import { useCallback, useLayoutEffect, useState } from "react";
import { useInvestmentContext } from "../contexts/InvestmentContext";
import { PrincipalPage } from "../layout/PrincipalPage"
import { Chart, ChartConfiguration, ChartData, ChartItem, registerables } from 'chart.js';
import { currencyFormat } from "../utils/currencyFormat";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

export const InvestmentProjection = (): JSX.Element => {
    const { investment, clear, money, saving, earnings } = useInvestmentContext();
    const [chartElement, setChartElement] = useState<ChartItem>();
    const navigate = useNavigate();
    const chartRef = useCallback((node: HTMLCanvasElement) => {
        if (node !== null) {
            setChartElement(node);
        }
    }, []);

    console.log(investment);

    useLayoutEffect(() => {
        const chartData = (): ChartData => ({
            labels: ['El rendimiento de tu inversión en un año'],
            datasets: [
                {
                    label: 'Dinero original invertido',
                    data: [money],
                    backgroundColor: '#22aa99'
                },
                {
                    label: 'aportación adicional',
                    data: [saving * 12],
                    backgroundColor: 'red'
                },
                {
                    label: 'rendimiento obtenido',
                    data: [earnings - (money  + saving * 12)],
                    backgroundColor: 'blue'
                },
            ]
        });

        const config: ChartConfiguration = {
            type: 'bar',
            data: chartData(),
            options: {
                plugins: {
                    title: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };
        if (chartElement) {
            let chart = new Chart(
                chartElement,
                config,
            );
            (chart.canvas.parentNode as HTMLElement).style.height = '350px';
        }
    }, [chartElement]);

    const returnToInvestment = useCallback(() => {
        clear();
        navigate(-1);
    }, []);

    return (
        <Grid justifyContent="center" px={4} mt={2}>
            <Card>
                <Typography variant="h5" pl={2} mt={3}>Inversión recomendada</Typography>
                <CardContent>
                    <Typography>Nombre: {investment?.name}</Typography>
                    <Typography>Rendimiento anual: {investment?.yield_rate}% anual</Typography>
                    <Typography>Dinero al principio: {currencyFormat.format(money)}</Typography>
                    <Typography>Dinero al cabo de un año: {currencyFormat.format(earnings)}</Typography>
                    <Box my={2}>
                    <canvas ref={chartRef} />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button onClick={returnToInvestment}  fullWidth={true} variant="contained">Crear otra estrategia</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}