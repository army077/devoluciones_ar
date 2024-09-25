import React, { useEffect, useState } from 'react';
import { Table, Card, Layout, Row, Col, Spin, Button } from 'antd';
import axios from 'axios';

interface PiezasTableProps {
    selectedEstado: string | null; // Prop para el estado seleccionado
}

const PiezasTable: React.FC<PiezasTableProps> = ({ selectedEstado }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamada a la API para obtener todas las piezas, independientemente del estado
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones');
                
                // Si hay un estado seleccionado, filtra los datos. Si no, muestra todo.
                if (selectedEstado) {
                    const filteredData = response.data.filter((pieza: any) => pieza.estado === selectedEstado.toLowerCase());
                    setData(filteredData);
                } else {
                    setData(response.data); // Si no hay estado, muestra todos los datos
                }
            } catch (error) {
                console.error("Error al obtener los datos de la API", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedEstado]);

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
