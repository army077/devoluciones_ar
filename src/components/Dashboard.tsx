import React from "react";
import { Row, Col, Card } from "antd";
import { PiezasPorEstado } from "../pages/piezas/tabla/PiezasPorEstado";
import { PiezasPorPersonaList } from "../pages/piezas/PiezasPorPersona";
import { useTheme } from "../components/ThemeContext";

export const Dashboard: React.FC = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    return (
        <div style={{ padding: 24 }}>
            <h2>Dashboard</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Piezas por Estado">
                        <PiezasPorEstado />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Piezas por Persona">
                        <PiezasPorPersonaList />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
