import React from "react";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";

export const TecnicosCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Teléfono" name="telefono" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Correo" name="correo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};