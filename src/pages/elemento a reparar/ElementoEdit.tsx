import React from "react";
import { Edit, Form, Input, InputNumber, useForm } from "@pankod/refine-antd";

export const ElementosEdit: React.FC = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Descripción" name="descripcion" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Clasificación" name="clasificacion" rules={[{ required: true }]}>
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
