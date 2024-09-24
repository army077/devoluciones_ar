import React from "react";
import { Create, Form, Input, useForm, InputNumber } from "@pankod/refine-antd";

// Obtener el mes actual, anterior y siguiente
const getCurrentMonthRange = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Mes actual (0 - Enero, 11 - Diciembre)

    // Mapear el número del mes al nombre
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const previousMonth = (currentMonth - 1 + 12) % 12; // Mes anterior
    const nextMonth = (currentMonth + 1) % 12;          // Mes siguiente

    return {
        currentMonthName: monthNames[currentMonth],
        previousMonthName: monthNames[previousMonth],
        nextMonthName: monthNames[nextMonth],
        currentMonthKey: monthNames[currentMonth].toLowerCase(),
        previousMonthKey: monthNames[previousMonth].toLowerCase(),
        nextMonthKey: monthNames[nextMonth].toLowerCase(),
    };
};

export const ElementosCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm();

    // Obtener nombres de los meses actual, anterior y siguiente
    const {
        currentMonthName, previousMonthName, nextMonthName,
        currentMonthKey, previousMonthKey, nextMonthKey
    } = getCurrentMonthRange();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Clasificación" name="clasificacion" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Descripcion" name="descripcion" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="No. Parte" name="no_parte" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Costo" name="costo" rules={[{ required: true }]}>
                    <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Tiempo" name="tiempo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="TSP" name="tsp" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

            
            </Form>
        </Create>
    );
};
