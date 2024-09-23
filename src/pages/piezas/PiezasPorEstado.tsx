import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { Spin } from "@pankod/refine-antd";

// Definir el tipo de los datos de estado
interface PiezaEstado {
    name: string;
    value: number;
}

// Colores para cada estado
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const PiezasPorEstado: React.FC = () => {
    const [data, setData] = useState<PiezaEstado[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llamada directa a la API usando axios
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');
                
                // Filtrar y contar piezas por estado
                const estados = ["prestamo", "reparacion", "instalada", "devuelta"];
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
                    outerRadius={150}
                    fill="#8884d8"
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