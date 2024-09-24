import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import { List, Spin } from "@pankod/refine-antd";

// Definir el tipo de los datos de estado
interface PiezaPersona {
    name: string;
    value: number;
}

export const PiezasPorPersonaList: React.FC = () => {
    const [data, setData] = useState<PiezaPersona[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llamada directa a la API usando axios
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');
                
                // Agrupar por persona o entidad (cliente, técnico, sucursal, taller)
                const entidades = ["cliente", "tecnico", "sucursal", "taller"];
                const piezasPorPersona = entidades.map((entidad) => ({
                    name: entidad.charAt(0).toUpperCase() + entidad.slice(1),
                    value: response.data.filter((pieza: any) => pieza.ubicacion_actual === entidad).length,
                }));

                setData(piezasPorPersona);
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
        <List title="Piezas por Persona/Entidad">
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </List>
    );
};
