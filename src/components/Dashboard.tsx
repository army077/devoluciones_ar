import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { PiezasPorEstado } from "../pages/piezas/tabla/PiezasPorEstado";
import { PiezasPorPersonaList } from "../pages/piezas/PiezasPorPersona";
import  PiezasTable  from "../pages/piezas/tabla/PiezasListaPrestamo";
import { useTheme } from "../components/ThemeContext";

export const Dashboard: React.FC = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    
    // Estado para almacenar el estado seleccionado en el gráfico
    const [selectedEstado, setSelectedEstado] = useState<string | null>(null);

    return (
        <div style={{ padding: 24 }}>
            <h2>Dashboard</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Piezas por Estado">
                        <PiezasPorEstado onSelectEstado={setSelectedEstado}/>
                    </Card>
                </Col>
                {/* Columna 2: Piezas por Persona */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card title="Piezas por Persona" style={{ height: '650px' }}>
                        <PiezasPorPersonaList />
                    </Card>
                </Col>
                <Col xs={24} md={24}>
                    <Card title={``}>
                        {/* Pasa el estado seleccionado a la tabla */}
                        <PiezasTable selectedEstado={selectedEstado} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};