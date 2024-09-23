import React from "react";
import { List, Table, useTable , EditButton, DeleteButton,} from "@pankod/refine-antd";

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
                <Table.Column
                    title="Acciones"
                    render={(_, record) => (
                        <>
                            <EditButton recordItemId={record.id}  style={{ marginRight: 20 }}/>
                            <DeleteButton recordItemId={record.id} />
                        </>
                    )}
                />
            </Table>
        </List>
    );
};