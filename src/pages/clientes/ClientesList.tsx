import React, { useState } from "react";
import { List, Table, useTable, EditButton, DeleteButton, Input } from "@pankod/refine-antd";

export const ClientesList: React.FC = () => {
    const { tableProps } = useTable();

    // Estado para manejar el término de búsqueda
    const [searchText, setSearchText] = useState("");

    // Filtrar los datos de la tabla en base al término de búsqueda
    const filteredData = tableProps?.dataSource?.filter((item: any) => {
        return (
            item.nombre?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.direccion?.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    return (
        <List>
            {/* Agregar el campo de búsqueda */}
            <Input
                placeholder="Buscar por nombre o dirección..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: "50%" }}
            />

            <Table
                {...tableProps}
                dataSource={filteredData} // Usar los datos filtrados
                rowKey="id"
            >
                <Table.Column title="Nombre" dataIndex="nombre" />
                <Table.Column title="Dirección" dataIndex="direccion" />
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
