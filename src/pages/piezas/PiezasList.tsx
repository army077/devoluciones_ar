import React from "react";
import { List, Table, useTable, EditButton, DeleteButton } from "@pankod/refine-antd";

export const PiezasList: React.FC = () => {
    const { tableProps } = useTable();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column title="Código" dataIndex="codigo" />
                <Table.Column title="Descripción" dataIndex="descripcion" />
                <Table.Column title="Estado" dataIndex="estado" />
                <Table.Column title="Ubicación Actual" dataIndex="ubicacion_actual" />
                <Table.Column title="Fecha de Salida" dataIndex="fecha_salida" />
                <Table.Column title="Fecha de Entrada" dataIndex="fecha_entrada" />

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