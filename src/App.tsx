import React from "react";
import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout } from "@pankod/refine-antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import routerProvider from "@pankod/refine-react-router-v6";
import { ClientesList } from "./pages/clientes/ClientesList";
import { ClientesCreate } from "./pages/clientes/ClientesCreate";
import { ClientesEdit } from "./pages/clientes/ClientesEdit";
import { PiezasList } from "./pages/piezas/PiezasList";
import { PiezasCreate } from "./pages/piezas/PiezasCreate";
import { PiezasEdit } from "./pages/piezas/PiezasEdit";

import { ElementosCreate } from "./pages/elemento a reparar/ElementoCreate";
import { ElementosEdit } from "./pages/elemento a reparar/ElementoEdit";
import { ElementosList } from "./pages/elemento a reparar/ElementoList";



import { SucursalesList } from "./pages/sucursales/SucursalesList";
import { SucursalesCreate } from "./pages/sucursales/SucursalesCreate";
import { SucursalesEdit } from "./pages/sucursales/SucursalesEdit";
import { TecnicosList } from "./pages/tecnicos/TecnicosList";
import { TecnicosCreate } from "./pages/tecnicos/TecnicosCreate";
import { TecnicosEdit } from "./pages/tecnicos/TecnicosEdit";
import { Dashboard } from "./components/Dashboard";
import { CustomSider } from "./components/CustomSider";
import { ThemeProvider } from "./components/ThemeContext";
import PiezasTable from "./pages/piezas/tabla/PiezasListaPrestamo"; // Importamos el componente para la tabla filtrada
import './App.css';
import { PiezasPorEstado } from "./pages/piezas/tabla/PiezasPorEstado";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <Routes>
                    {/* Ruta principal con Refine */}
                    <Route
                        path="/*"
                        element={
                            <Refine
                                dataProvider={dataProvider} // Usa el dataProvider que creaste
                                notificationProvider={notificationProvider}
                                Layout={Layout}
                                Sider={CustomSider} // Incluye el Sider personalizado
                                resources={[
                                    {
                                        name: "dashboard",
                                        list: Dashboard,
                                        options: { label: "Dashboard" },
                                    },
                                    {
                                        name: "clientes_devoluciones",
                                        list: ClientesList,
                                        create: ClientesCreate,
                                        edit: ClientesEdit,
                                    },
                                    {
                                        name: "piezas_devoluciones",
                                        list: PiezasList,
                                        create: PiezasCreate,
                                        edit: PiezasEdit,
                                    },
                                    {
                                        name: "sucursales",
                                        list: SucursalesList,
                                        create: SucursalesCreate,
                                        edit: SucursalesEdit,
                                    },
                                    {
                                        name: "tecnicos_devoluciones",
                                        list: TecnicosList,
                                        create: TecnicosCreate,
                                        edit: TecnicosEdit,
                                    },
                                    {
                                        name: "elementos",
                                        list: ElementosList,
                                        create: ElementosCreate,
                                        edit: ElementosEdit,
                                    },
                                    {
                                        name: 'PiezasTable',
                                        list: PiezasPorEstado
                                    },
                                ]}
                                routerProvider={routerProvider}
                            />
                        }
                    />
                    {/* Ruta para la tabla filtrada */}
                    <Route path="/piezas" element={<PiezasTable />} /> {/* La ruta de tabla filtrada */}
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;