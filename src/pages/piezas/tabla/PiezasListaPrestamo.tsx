import React, { useEffect, useState } from 'react';
import { Table, Card, Layout, Row, Col, Spin, Button } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;

// Función para obtener los parámetros de la URL
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PiezasTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const query = useQuery();
    const categoria = query.get('categoria'); // Obtener la categoría desde la URL
    const navigate = useNavigate(); // Para manejar la navegación

    useEffect(() => {
        // Llamada a la API para obtener los datos filtrados
        axios.get('https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones')
            .then(response => {
                // Filtrar los datos de la API según la categoría seleccionada
                const filteredData = response.data.filter((pieza: any) => pieza.estado === categoria);
                setData(filteredData);
            })
            .catch(error => {
                console.error("Error al obtener los datos de la API", error);
            })
            .finally(() => {
                setLoading(false); // Deja de mostrar el Spin cuando se complete la llamada
            });
    }, [categoria]);

    // Definir las columnas de la tabla
    const columns = [
        { title: 'Tecnico', dataIndex: 'tecnico_nombre', key: 'tecnico_nombre' },
        { title: 'Descripcion', dataIndex: 'descripcion', key: 'descripcion' },
        { title: 'Estado', dataIndex: 'estado', key: 'estado' },
        { title: 'Ubicacion Actual', dataIndex: 'ubicacion_actual', key: 'ubicacion_actual' },
    ];

    // Función para navegar hacia la página anterior
    const handleBackClick = () => {
        navigate(-1); // Navega hacia atrás en el historial
    };

    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} md={24}>
                        <Card title={`Piezas en estado: ${categoria}`}>
                            {loading ? (
                                <Spin size="large" />
                            ) : (
                                <>
                                    <Table 
                                        columns={columns} 
                                        dataSource={data} 
                                        rowKey="id" 
                                        pagination={{ pageSize: 5 }} // Paginación opcional
                                    />
                                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                        <Button type="primary" onClick={handleBackClick}> {/* Botón de regresar */}
                                            Regresar
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default PiezasTable;
