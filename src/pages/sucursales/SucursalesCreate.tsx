import React from "react";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";

export const SucursalesCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Dirección" name="direccion" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};