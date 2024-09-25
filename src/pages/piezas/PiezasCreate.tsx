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

interface Elemento {
    id: number;
    descripcion: string;
}

export const PiezasCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm(); // Para manejar el formulario correctamente
    const API_URL = "https://www.desarrollotecnologicoar.com/api1";

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [elementos, setElementos] = useState<Elemento[]>([]); // Estado para almacenar las descripciones de elementos

    // Cargar los datos desde la API
    useEffect(() => {
        // Función para cargar datos de la API
        const fetchData = async () => {
            try {
                const clientesResponse = await axios.get(`${API_URL}/clientes_devoluciones`);
                const tecnicosResponse = await axios.get(`${API_URL}/tecnicos_devoluciones`);
                const talleresResponse = await axios.get(`${API_URL}/talleres`);
                const sucursalesResponse = await axios.get(`${API_URL}/sucursales`);
                const elementosResponse = await axios.get(`${API_URL}/elementos`); // Obtener los elementos

                setClientes(clientesResponse.data);
                setTecnicos(tecnicosResponse.data);
                setTalleres(talleresResponse.data);
                setSucursales(sucursalesResponse.data);
                setElementos(elementosResponse.data); // Guardar las descripciones de los elementos
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

                {/* Mostrar las descripciones de elementos en un Select */}
                <Form.Item label="Descripción" name="descripcion" rules={[{ required: true }]}>
                    <Select showSearch placeholder="Seleccione una descripción">
                        {elementos.map((elemento: Elemento) => (
                            <Select.Option key={elemento.id} value={elemento.descripcion}>
                                {elemento.descripcion}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Numero de Serie" name="numero_serie" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Estado" name="estado" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { label: "Enviado", value: "enviado" },
                            { label: "Para envío", value: "para envio" },
                            { label: "En proceso de reparación", value: "en proceso reparacion" },
                            { label: "En Diagnostico", value: "en diagnostico" },
                            { label: "Por Diagnosticar", value: "por diagnosticar" },
                            { label: "Cambio", value: "cambio" },
                            { label: "Recuperado", value: "recuperado" },
                            { label: "Valoración", value: "valoracion" },
                            { label: "Reparada y en espera de pago", value: "reparada en espera_pago" },
                            { label: "En servicio con proveedor", value: "en servicio con proveedor" },
                            { label: "No se autoriza la reparación", value: "no autoriza reparacion" },
                            { label: "No tuvo reparación", value: "no tuvo reparacion" },
                            { label: "Scrap", value: "scrap" }
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
