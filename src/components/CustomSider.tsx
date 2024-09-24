import React from "react";
import { Layout, Menu } from "antd";
import { useRouterContext } from "@pankod/refine-core";
import { DashboardOutlined, UserOutlined, ToolOutlined, ShopOutlined, BranchesOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export const CustomSider: React.FC = () => {
    const { Link } = useRouterContext();

    return (
        <Sider collapsible>
            <div style={{ padding: "16px", textAlign: "center", color: "#fff" }}>
                <img
                    src="/AR LOGO.png"
                    alt="Logo"
                    style={{ width: "100%", marginBottom: "16px" }}
                />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    <Link to="/clientes_devoluciones">Clientes</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ToolOutlined />}>
                    <Link to="/piezas_devoluciones">Piezas</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<ShopOutlined />}>
                    <Link to="/sucursales">Sucursales</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<BranchesOutlined />}>
                    <Link to="/tecnicos_devoluciones">Técnicos</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
