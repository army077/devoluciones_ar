import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { Spin } from "@pankod/refine-antd";
import { useNavigate } from "react-router-dom";

// Definir el tipo de los datos de estado
interface PiezaEstado {
    name: string;
    value: number;
}

// Colores extendidos para cada estado
const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF"
];

export const PiezasPorEstado: React.FC = () => {
    const [data, setData] = useState<PiezaEstado[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Para redirigir a otra página

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llamada directa a la API usando axios
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');

                // Filtrar y contar piezas por estado
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
    }, []);

    // Manejar el clic en una sección del gráfico
    const handlePieClick = (data: PiezaEstado) => {
        // Redirigir a la página de la tabla, pasando el estado seleccionado en la URL
        navigate(`/piezas?categoria=${data.name.toLowerCase()}`);
    };

    if (loading) return <Spin size="large" />;

    return (
        <div>
            <h3>Piezas por Estado</h3>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    fill="#8884d8"
                    onClick={(_, index) => handlePieClick(data[index])} // Captura el clic en la sección
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};
