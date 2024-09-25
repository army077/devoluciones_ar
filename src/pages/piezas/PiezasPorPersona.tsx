import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import { Spin } from "@pankod/refine-antd";

interface PiezaPersona {
    name: string;
    value: number;
}

export const PiezasPorPersonaList: React.FC = () => {
    const [data, setData] = useState<PiezaPersona[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartSize, setChartSize] = useState({ width: 400, height: 300 }); // Tamaño inicial para pantallas grandes

    useEffect(() => {
        const fetchData = async () => {
            try {
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
            // Ajuste del tamaño del gráfico dependiendo del tamaño de la pantalla
            const width = window.innerWidth < 768 ? 300 : 400;
            const height = window.innerWidth < 768 ? 200 : 300;
            setChartSize({ width, height });
        };

        fetchData();
        window.addEventListener("resize", handleResize);
        handleResize(); // Ejecutar al montar el componente

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (loading) return <Spin size="large" />;

    return (
        <div style={{ textAlign: "center" }}>
            <h3>Piezas por Persona/Entidad</h3>
            <BarChart width={chartSize.width} height={chartSize.height} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};