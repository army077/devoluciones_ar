import React, { useEffect, useState } from 'react';
import { Table, Card, Layout, Row, Col, Spin } from 'antd';
import axios from 'axios';

interface PiezasTableProps {
    selectedEstado: string | null; // Prop para el estado seleccionado
    selectedPersona: string | null; // Prop para la persona seleccionada
}

const PiezasTable: React.FC<PiezasTableProps> = ({ selectedEstado, selectedPersona }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');

                let filteredData = response.data;

                // Filtrar por estado si se ha seleccionado uno
                if (selectedEstado) {
                    filteredData = filteredData.filter((pieza: any) => pieza.estado === selectedEstado.toLowerCase());
                }

                // Filtrar por persona si se ha seleccionado una
                if (selectedPersona) {
                    filteredData = filteredData.filter((pieza: any) => pieza.ubicacion_actual === selectedPersona.toLowerCase());
                }

                setData(filteredData);
            } catch (error) {
                console.error("Error al obtener los datos de la API", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedEstado, selectedPersona]); // Ejecuta el efecto cuando cambia alguno de los filtros

    const columns = [
        { title: 'Cliente', dataIndex: 'cliente_nombre', key: 'cliente_nombre', render: (text: any) => text || 'No hay técnico' },
        { title: 'Descripcion', dataIndex: 'descripcion', key: 'descripcion' },
        { title: 'Fecha de entrada', dataIndex: 'fecha_entrada', key: 'fecha_entrada' },
        { title: 'Ubicacion Actual', dataIndex: 'ubicacion_actual', key: 'ubicacion_actual' },
    ];

    if (loading) return <Spin size="large" />;

    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            rowKey="id" 
            pagination={{ pageSize: 5 }} 
        />
    );
};

export default PiezasTable;
