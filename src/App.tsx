import React from "react";
import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout } from "@pankod/refine-antd";
import { BrowserRouter } from "react-router-dom";
import { dataProvider } from "./dataProvider"; // Importa tu dataProvider personalizado
import routerProvider from "@pankod/refine-react-router-v6"
import { ClientesList } from "./pages/clientes/ClientesList"; // Ejemplo para la página de clientes
import { ClientesCreate } from "./pages/clientes/ClientesCreate"; // Ejemplo para la página de clientes
import { ClientesEdit } from "./pages/clientes/ClientesEdit"; // Ejemplo para la página de clientes
import { PiezasList, } from "./pages/piezas/PiezasList"; // Ejemplo para la página de piezas
import { PiezasCreate } from "./pages/piezas/PiezasCreate"; // Ejemplo para la página de piezas
import { PiezasEdit } from "./pages/piezas/PiezasEdit"; // Ejemplo para la página de piezas
import { SucursalesList } from "./pages/sucursales/SucursalesList"; // Ejemplo para sucursales
import { SucursalesCreate } from "./pages/sucursales/SucursalesCreate"; // Ejemplo para sucursales
import { SucursalesEdit } from "./pages/sucursales/SucursalesEdit"; // Ejemplo para sucursales
import { TecnicosList } from "./pages/tecnicos/TecnicosList"; // Ejemplo para técnicos
import { TecnicosCreate } from "./pages/tecnicos/TecnicosCreate"; // Ejemplo para técnicos
import { TecnicosEdit } from "./pages/tecnicos/TecnicosEdit"; // Ejemplo para técnicos
import { Dashboard } from "./components/Dashboard"; // Importa el Dashboard
import { CustomSider } from "./components/CustomSider"; // Importa el Dashboard

const App: React.FC = () => {
    return (
        <BrowserRouter>
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
                ]}
                routerProvider={routerProvider}
            />
        </BrowserRouter>
    );
};

export default App;