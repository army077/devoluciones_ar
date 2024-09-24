import React, { useEffect, useState } from "react";
import { Edit, Form, Input, InputNumber, useForm, Select } from "@pankod/refine-antd";
import axios from "axios";

export const ElementosEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm();
    const [clasificaciones, setClasificaciones] = useState([]); // Estado para almacenar las clasificaciones

    // Hacer la solicitud a la API para obtener las clasificaciones
    useEffect(() => {
        const fetchClasificaciones = async () => {
            try {
                const response = await axios.get('https://desarrollotecnologicoar.com/api1/clasificacion_elementos');
                // Filtramos solo las clasificaciones que estén activas
                const data = response.data.filter((item: any) => item.activo);
                setClasificaciones(data); // Guardar las clasificaciones en el estado
            } catch (error) {
                console.error("Error al obtener las clasificaciones:", error);
            }
        };

        fetchClasificaciones();
    }, []); // Ejecutar solo al montar el componente

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">

                 {/* Mostrar las clasificaciones en un Select */}
                 <Form.Item label="Clasificación" name="clasificacion" rules={[{ required: true }]}>
                    <Select>
                        {clasificaciones.map((item: any) => (
                            <Select.Option key={item.id} value={item.clasificacion}>
                                {item.clasificacion}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Descripción" name="descripcion" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="No. Parte" name="no_parte" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Costo" name="costo" rules={[{ required: true }]}>
                    <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="TSP" name="tsp" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                {/* Campo de tiempo */}
                <Form.Item label="Tiempo" name="tiempo" rules={[{ required: true }]}>
                    <InputNumber min={0} step={1} style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
