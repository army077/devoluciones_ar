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
                {/* Columna 1: Piezas por Estado */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card title="Piezas por Estado" style={{ height: '650px' }}>
                        <PiezasPorEstado />
                    </Card>
                </Col>
                {/* Columna 2: Piezas por Persona */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card title="Piezas por Persona" style={{ height: '650px' }}>
                        <PiezasPorPersonaList />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};