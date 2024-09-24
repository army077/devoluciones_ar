import React, { useState } from "react";
import { List, Table, useTable, EditButton, DeleteButton, Input } from "@pankod/refine-antd";

export const PiezasList: React.FC = () => {
    const { tableProps } = useTable();

    // Estado para almacenar el término de búsqueda
    const [searchText, setSearchText] = useState("");

    // Filtrar los datos de la tabla en base al término de búsqueda
    const filteredData = tableProps?.dataSource?.filter((item: any) => {
        return (
            item.codigo?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.descripcion?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.numero_serie?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.estado?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.ubicacion_actual?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.cliente_nombre?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.tecnico_nombre?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.sucursal_nombre?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.taller_nombre?.toLowerCase().includes(searchText.toLowerCase())
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
            >
                <Table.Column title="Ticket" dataIndex="codigo" />
                <Table.Column title="Descripción" dataIndex="descripcion" />
                <Table.Column title="Numero de Serie" dataIndex="numero_serie" />
                <Table.Column title="Estado" dataIndex="estado" />
                <Table.Column title="Ubicación Actual" dataIndex="ubicacion_actual" />
                <Table.Column title="Fecha de Entrada" dataIndex="fecha_entrada" />
                <Table.Column title="Fecha de Salida" dataIndex="fecha_salida" />

                {/* Mostrar el nombre del cliente */}
                <Table.Column
                    title="Cliente"
                    dataIndex="cliente_nombre"
                    render={(cliente_nombre) => cliente_nombre || "Ninguno"}
                />

                {/* Mostrar el nombre del técnico */}
                <Table.Column
                    title="Técnico"
                    dataIndex="tecnico_nombre"
                    render={(tecnico_nombre) => tecnico_nombre || "Ninguno"}
                />

                {/* Mostrar el nombre de la sucursal */}
                <Table.Column
                    title="Sucursal"
                    dataIndex="sucursal_nombre"
                    render={(sucursal_nombre) => sucursal_nombre || "Ninguno"}
                />

                {/* Mostrar el nombre del taller */}
                <Table.Column
                    title="Taller"
                    dataIndex="taller_nombre"
                    render={(taller_nombre) => taller_nombre || "Ninguno"}
                />

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
