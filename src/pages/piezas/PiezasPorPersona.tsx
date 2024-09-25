import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import { List, Spin } from "@pankod/refine-antd";

// Definir el tipo de los datos de estado
interface PiezaPersona {
    name: string;
    value: number;
}

// Definir las props del componente
interface PiezasPorPersonaListProps {
    onSelectPersona: (persona: string) => void; // Función para seleccionar una persona
}

export const PiezasPorPersonaList: React.FC<PiezasPorPersonaListProps> = ({onSelectPersona}) => {
    const [data, setData] = useState<PiezaPersona[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartSize, setChartSize] = useState({ width: 400, height: 300 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llamada directa a la API usando axios
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');
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
        const handleResize = () => {
            const width = window.innerWidth < 768 ? 300 : 400;
            const height = window.innerWidth < 768 ? 200 : 300;
            setChartSize({ width, height });
        };

        fetchData();
    }, []);

        // Manejar el clic en una barra del gráfico
    const handleBarClick = (data: PiezaPersona) => {
        onSelectPersona(data.name); // Llama a la función del padre con la persona seleccionada
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
