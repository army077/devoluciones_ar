import React, { useEffect, useState } from 'react';
import { Descriptions, Spin, Card } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PiezaDetalle: React.FC = () => {
  const { id } = useParams(); // Obtiene el ID del ticket desde la URL
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPieza = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://www.desarrollotecnologicoar.com/api1/piezas_devoluciones/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la pieza', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPieza();
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!data) return <p>No se encontró información para esta pieza</p>;

  return (
    <Card title={`Detalles de la Pieza - ${data.codigo}`} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Código">{data.codigo}</Descriptions.Item>
        <Descriptions.Item label="Descripción">{data.descripcion}</Descriptions.Item>
        <Descriptions.Item label="Estado">{data.estado}</Descriptions.Item>
        <Descriptions.Item label="Ubicación Actual">{data.ubicacion_actual}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Entrada">{data.fecha_entrada || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Salida">{data.fecha_salida || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Número de Serie">{data.numero_serie}</Descriptions.Item>
        <Descriptions.Item label="Tipo de Servicio">{data.tipo_servicio}</Descriptions.Item>
        <Descriptions.Item label="Descripción del Problema">{data.descripcion_problema}</Descriptions.Item>
        <Descriptions.Item label="Cliente">{data.cliente_nombre}</Descriptions.Item>
        <Descriptions.Item label="Técnico">{data.tecnico_nombre || 'No asignado'}</Descriptions.Item>
        <Descriptions.Item label="Taller">{data.taller_nombre}</Descriptions.Item>
        <Descriptions.Item label="Sucursal">{data.sucursal_nombre}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PiezaDetalle;
