import React from "react";
import { List, Table, useTable, EditButton, DeleteButton,  } from "@pankod/refine-antd";

export const SucursalesList: React.FC = () => {
    const { tableProps } = useTable();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column title="Nombre" dataIndex="nombre" />
                <Table.Column title="Dirección" dataIndex="direccion" />
                <Table.Column
                    title="Acciones"
                    render={(_, record) => (
                        <>
                            <EditButton recordItemId={record.id} />
                            <DeleteButton recordItemId={record.id} />
                        </>
                    )}
                />
            </Table>
        </List>
    );
};