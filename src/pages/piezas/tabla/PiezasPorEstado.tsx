import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Spin, Typography } from "@pankod/refine-antd";
import axios from "axios";

interface PiezaEstado {
    name: string;
    value: number;
}

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF"
];

interface PiezasPorEstadoProps {
    onSelectEstado: (estado: string) => void;
    dates: [string | null, string | null]; // Recibir el rango de fechas desde el padre
}

export const PiezasPorEstado: React.FC<PiezasPorEstadoProps> = ({ onSelectEstado, dates }) => {
    const [data, setData] = useState<PiezaEstado[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartSize, setChartSize] = useState({ width: 300, height: 400 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones';
                const [startDate, endDate] = dates;

                if (startDate && endDate) {
                    url += `?startDate=${startDate}&endDate=${endDate}`;
                }

                const response = await axios.get(url);

                const estados = ["para envio", "en proceso reparacion", "en diagnostico", "por diagnosticar", "cambio", "recuperado", "valoracion", "reparada en espera pago", "en servicio con proveedor", "no autoriza reparacion", "no tuvo reparacion", "scrap"];
                const piezasPorEstado = estados.map((estado) => ({
                    name: estado.charAt(0).toUpperCase() + estado.slice(1),
                    value: response.data.filter((pieza: any) => pieza.estado === estado).length,
                }));

                setData(piezasPorEstado);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dates]); // Dependencias para actualizar los datos cuando cambien las fechas

    const handlePieClick = (data: PiezaEstado) => {
        onSelectEstado(data.name);
    };

    if (loading) return <Spin size="large" />;

    const allValuesZero = data.every(pieza => pieza.value === 0);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {allValuesZero ? (
                <Typography.Text>No hay registros para el rango de fechas seleccionado.</Typography.Text>
            ) : (
                <PieChart width={chartSize.width} height={chartSize.height}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={Math.min(chartSize.width, chartSize.height) / 2 - 40}
                        fill="#8884d8"
                        onClick={(_, index) => handlePieClick(data[index])}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                </PieChart>
            )}
        </div>
    );
};
