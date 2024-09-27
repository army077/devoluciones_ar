import React, { useEffect, useState } from 'react';
import { Table, Spin, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Search } = Input;

interface PiezasTableProps {
    selectedEstado: string | null; // Prop para el estado seleccionado
    selectedPersona: string | null; // Prop para la persona seleccionada
}

const PiezasTable: React.FC<PiezasTableProps> = ({ selectedEstado, selectedPersona }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(''); // Estado para el término de búsqueda

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
    }, [selectedEstado, selectedPersona]);

    // Filtrar los datos por el término de búsqueda (ticket)
    const searchedData = data.filter((pieza: any) => 
        pieza.codigo.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { title: 'Cliente', dataIndex: 'cliente_nombre', key: 'cliente_nombre', render: (text: any) => text || 'No hay técnico' },

        { 
            title: 'Ticket', 
            dataIndex: 'codigo', 
            key: 'codigo',
            render: (codigo: string, record: any) => (
                <Link to={`/tickets/${record.id}`}>
                    {codigo}
                </Link>
            )
        },
        { title: 'Descripcion', dataIndex: 'descripcion', key: 'descripcion' },
        { title: 'Fecha de entrada', dataIndex: 'fecha_entrada', key: 'fecha_entrada' },
        { title: 'Ubicacion Actual', dataIndex: 'ubicacion_actual', key: 'ubicacion_actual' },
    ];

    if (loading) return <Spin size="large" />;

    return (
        <div>
            {/* Barra de búsqueda */}
            <Search 
                placeholder="Buscar por ticket" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
                style={{ marginBottom: 16 }} // Espacio entre la barra de búsqueda y la tabla
            />

            {/* Tabla con los datos filtrados */}
            <Table 
                columns={columns} 
                dataSource={searchedData} // Usamos los datos filtrados por búsqueda
                rowKey="id" 
                pagination={{ pageSize: 5 }} 
            />
        </div>
    );
};

export default PiezasTable;
