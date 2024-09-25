import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { Spin } from "@pankod/refine-antd";
import { useNavigate } from "react-router-dom";

interface PiezaEstado {
    name: string;
    value: number;
}

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF"
];

export const PiezasPorEstado: React.FC = () => {
    const [data, setData] = useState<PiezaEstado[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartSize, setChartSize] = useState({ width: 300, height: 400 }); // Inicia con tamaño pequeño
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');
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

        const handleResize = () => {
            // Si la pantalla es menor de 768px (por ejemplo, dispositivos móviles)
            if (window.innerWidth < 768) {
                setChartSize({ width: 300, height: 400 }); // Tamaño más pequeño para móviles
            } else {
                setChartSize({ width: 500, height: 400 }); // Tamaño más grande para pantallas grandes
            }
        };

        fetchData();
        window.addEventListener("resize", handleResize);
        handleResize(); // Ejecutar cuando el componente se monte

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePieClick = (data: PiezaEstado) => {
        navigate(`/piezas?categoria=${data.name.toLowerCase()}`);
    };

    const truncateName = (name: string, maxLength: number = 18): string => {
        if (name.length > maxLength) {
            return `${name.slice(0, maxLength)}...`;
        }
        return name;
    };

    if (loading) return <Spin size="large" />;

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
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
                <Tooltip formatter={(value: number, name: string) => [value, truncateName(name)]} />
                <Legend verticalAlign="bottom" height={36} formatter={(value: string) => truncateName(value)} />
            </PieChart>
        </div>
    );
};