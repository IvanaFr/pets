import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/home";
import { Popis } from "../pages/popis";
import { Obavijesti } from "../pages/obavijesti";
import { Donacije } from "../pages/donacije";
import { Onama } from "../pages/o-nama";
import Unos from "../pages/unos";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <Onama />,
    },
    {
        path: "/popis",
        element: <Popis />,
    },
    {
        path: "/obavijesti",
        element: <Obavijesti />,
    },
    {
        path: "/donacije",
        element: <Donacije />,
    },
    {
        path: "/unos",
        element: <Unos />,
    },
]);

export default routes;
