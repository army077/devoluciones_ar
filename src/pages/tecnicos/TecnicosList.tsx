import React from "react";
import { List, Table, useTable, EditButton, DeleteButton, } from "@pankod/refine-antd";

export const TecnicosList: React.FC = () => {
    const { tableProps } = useTable();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column title="Nombre" dataIndex="nombre" />
                <Table.Column title="Teléfono" dataIndex="telefono" />
                <Table.Column title="Correo" dataIndex="correo" />
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