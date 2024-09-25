import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { PiezasPorEstado } from "../pages/piezas/tabla/PiezasPorEstado";
import { PiezasPorPersonaList } from "../pages/piezas/PiezasPorPersona";
import PiezasTable from "../pages/piezas/tabla/PiezasListaPrestamo";
import { useTheme } from "../components/ThemeContext";

export const Dashboard: React.FC = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    
    // Estados para almacenar las selecciones de los gráficos
    const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
    const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

    // Función para generar el título dinámico basado en los filtros aplicados
    const getTituloPiezas = () => {
        if (selectedEstado && selectedPersona) {
            return `Piezas en estado: ${selectedEstado} y asignadas a: ${selectedPersona}`;
        } else if (selectedEstado) {
            return `Piezas en estado: ${selectedEstado}`;
        } else if (selectedPersona) {
            return `Piezas asignadas a: ${selectedPersona}`;
        } else {
            return "Piezas totales";
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <h2>Dashboard</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Piezas por Estado">
                        <PiezasPorEstado onSelectEstado={setSelectedEstado} />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Piezas por Persona">
                        <PiezasPorPersonaList onSelectPersona={setSelectedPersona} />
                    </Card>
                </Col>
                <Col xs={24} md={24}>
                    {/* Utiliza la función `getTituloPiezas` para generar el título dinámico */}
                    <Card title={getTituloPiezas()}>
                        <PiezasTable selectedEstado={selectedEstado} selectedPersona={selectedPersona} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
