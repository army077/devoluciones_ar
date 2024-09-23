import React from "react";
import { Edit, Form, Input, useForm, Select } from "@pankod/refine-antd";

export const PiezasEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Código" name="codigo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion" rules={[{ required: true }]}>
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
                <Form.Item label="Fecha de Salida" name="fecha_salida" rules={[{ required: true }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item label="Fecha de Entrada" name="fecha_entrada">
                    <Input type="date" />
                </Form.Item>
            </Form>
        </Edit>
    );
};