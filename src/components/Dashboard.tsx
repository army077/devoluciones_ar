import React from "react";
import { Row, Col, Card } from "antd";
import { PiezasPorEstado } from "../pages/piezas/PiezasPorEstado";
import { PiezasPorPersona } from "../pages/piezas/PiezasPorPersona";

export const Dashboard: React.FC = () => {
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
                        <PiezasPorPersona />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};