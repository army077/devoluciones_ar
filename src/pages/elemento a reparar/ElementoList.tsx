import React, { useState } from "react";
import { List, Table, useTable, EditButton, DeleteButton, Input } from "@pankod/refine-antd";

// Función para obtener el nombre del mes actual
const getCurrentMonthName = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 es enero, 11 es diciembre

    // Mapear los nombres de los meses
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    return monthNames[currentMonth]; // Nombre del mes en minúscula
};

export const ElementosList: React.FC = () => {
    const { tableProps } = useTable();

    // Estado para almacenar el término de búsqueda
    const [searchText, setSearchText] = useState("");

    // Obtener el mes actual
    const currentMonth = getCurrentMonthName();

    // Filtrar los datos de la tabla en base al término de búsqueda
    const filteredData = tableProps?.dataSource?.filter((item: any) => {
        return (
            item.clasificacion?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.descripcion?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.no_parte?.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    return (
        <List>
            {/* Agregar el campo de búsqueda */}
            <Input
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: "50%" }}
            />

            <Table
                {...tableProps}
                dataSource={filteredData} // Usar los datos filtrados
                rowKey="id"
                style={{ alignContent: 'space-between' }}
            >
                <Table.Column title="Clasificación" dataIndex="clasificacion" />
                <Table.Column title="Descripción" dataIndex="descripcion" />
                <Table.Column title="No. Parte" dataIndex="no_parte" />
                <Table.Column title="Costo" dataIndex="costo" />
                <Table.Column title="Tiempo" dataIndex="tiempo" />
                <Table.Column title="TSP" dataIndex="tsp" />

                <Table.Column
                    title="Acciones"
                    render={(_, record) => (
                        <>
                            <EditButton recordItemId={record.id} style={{ marginRight: 20 }} />
                            <DeleteButton recordItemId={record.id} />
                        </>
                    )}
                />
            </Table>
        </List>
    );
};
