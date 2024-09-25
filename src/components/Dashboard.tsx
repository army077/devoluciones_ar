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
                        {/* Pasa la función que cambia el estado al gráfico */}
                        <PiezasPorEstado onSelectEstado={setSelectedEstado} />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Piezas por Persona">
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
