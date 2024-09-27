import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import { List, Spin } from "@pankod/refine-antd";

interface PiezaPersona {
    name: string;
    value: number;
}

interface PiezasPorPersonaListProps {
    onSelectPersona: (persona: string) => void; // Función para seleccionar una persona
    dates: [string | null, string | null]; // Rango de fechas recibido desde el componente padre
}

export const PiezasPorPersonaList: React.FC<PiezasPorPersonaListProps> = ({ onSelectPersona, dates }) => {
    const [data, setData] = useState<PiezaPersona[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartSize, setChartSize] = useState({ width: 400, height: 300 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones';
                const [startDate, endDate] = dates;

                if (startDate && endDate) {
                    url += `?startDate=${startDate}&endDate=${endDate}`;
                }

                const response = await axios.get(url);
                const entidades = ["cliente", "tecnico", "sucursal", "taller", "proveedor"];
                const piezasPorPersona = entidades.map((entidad) => ({
                    name: entidad.charAt(0).toUpperCase() + entidad.slice(1),
                    value: response.data.filter((pieza: any) => pieza.ubicacion_actual === entidad).length,
                }));
                console.log(piezasPorPersona);

                setData(piezasPorPersona);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dates]); // Dependencias para actualizar los datos cuando cambien las fechas

    const handleBarClick = (data: PiezaPersona) => {
        onSelectPersona(data.name);
    };

    if (loading) return <Spin size="large" />;

    return (
        <List title="Piezas por Persona/Entidad">
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" onClick={(_, index) => handleBarClick(data[index])} />
            </BarChart>
        </List>
    );
};
