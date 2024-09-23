import React from "react";
import { List, Table, useTable } from "@pankod/refine-antd";

export const ClientesList: React.FC = () => {
    const { tableProps } = useTable();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column title="Nombre" dataIndex="nombre" />
                <Table.Column title="Dirección" dataIndex="direccion" />
            </Table>
        </List>
    );
};