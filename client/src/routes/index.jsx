import { createBrowserRouter } from "react-router-dom";

import AñadirAutores from "../pages/AñadirAutores";

import Editar from "../pages/Editar"
import { Home } from "../pages/Home";

export default createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },


    {
        path: 'autores',
        element: <AñadirAutores />
    },
    {
        path: 'autores/:id/edit',
        element: <Editar />
    },



]);