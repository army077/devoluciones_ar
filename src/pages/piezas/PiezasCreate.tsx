import React, { useEffect, useState } from "react";
import { Create, Form, Input, Select, useForm } from "@pankod/refine-antd";
import axios from "axios";

// Define los tipos para las entidades
interface Cliente {
    id: number;
    nombre: string;
}

interface Tecnico {
    id: number;
    nombre: string;
}

interface Sucursal {
    id: number;
    nombre: string;
}

interface Taller {
    id: number;
    nombre: string;
}

export const PiezasCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm(); // Añadido para manejar el formulario correctamente
    const API_URL = "https://www.desarrollotecnologicoar.com/api1";

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    // Cargar los datos desde la API
    useEffect(() => {
        // Función para cargar datos de la API
        const fetchData = async () => {
            try {
                const clientesResponse = await axios.get(`${API_URL}/clientes_devoluciones`);
                const tecnicosResponse = await axios.get(`${API_URL}/tecnicos_devoluciones`);
                const talleresResponse = await axios.get(`${API_URL}/talleres`);
                const sucursalesResponse = await axios.get(`${API_URL}/sucursales`);

                setClientes(clientesResponse.data);
                setTecnicos(tecnicosResponse.data);
                setTalleres(talleresResponse.data);
                setSucursales(sucursalesResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();
    }, []); // Este efecto se ejecuta solo una vez al montar el componente

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Ticket" name="codigo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Numero de Serie" name="numero_serie" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Estado" name="estado" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { label: "Prestamo", value: "prestamo" },
                            { label: "En reparación", value: "reparacion" },
                            { label: "Instalada", value: "instalada" },
                            { label: "Devuelta", value: "devuelta" },
                        ]}
                    />
                </Form.Item>

                {/* Relación con Cliente */}
                <Form.Item label="Cliente" name="cliente_id">
                    <Select
                        showSearch
                        placeholder="Seleccione un cliente"
                        options={clientes.map(cliente => ({
                            label: cliente.nombre,
                            value: cliente.id,
                        }))}
                    />
                </Form.Item>

                {/* Relación con Técnico */}
                <Form.Item label="Técnico" name="tecnico_id">
                    <Select
                        showSearch
                        placeholder="Seleccione un técnico"
                        options={tecnicos.map(tecnico => ({
                            label: tecnico.nombre,
                            value: tecnico.id,
                        }))}
                    />
                </Form.Item>

                {/* Relación con Taller */}
                <Form.Item label="Taller" name="taller_id">
                    <Select
                        showSearch
                        placeholder="Seleccione un taller"
                        options={talleres.map(taller => ({
                            label: taller.nombre,
                            value: taller.id,
                        }))}
                    />
                </Form.Item>

                {/* Relación con Sucursal */}
                <Form.Item label="Sucursal" name="sucursal_id">
                    <Select
                        showSearch
                        placeholder="Seleccione una sucursal"
                        options={sucursales.map(sucursal => ({
                            label: sucursal.nombre,
                            value: sucursal.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item label="Ubicación Actual" name="ubicacion_actual" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { label: "Cliente", value: "cliente" },
                            { label: "Sucursal", value: "sucursal" },
                            { label: "Técnico", value: "tecnico" },
                            { label: "Almacén", value: "almacen" },
                            { label: "Taller", value: "taller" },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Fecha de Entrada" name="fecha_entrada">
                    <Input type="date" />
                </Form.Item>
                <Form.Item label="Tipo de Servicio" name="tipo_servicio" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { label: "Servicio Pagado", value: "Servicio Pagado" },
                            { label: "Garantías", value: "Garantías" },
                            { label: "Por Definir", value: "Por Definir" },
                            { label: "Interno", value: "Interno" },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Descripción del Problema" name="descripcion_problema" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Create>
    );
};