import React from 'react'
import Home from '../pages/home/Home';
import Search from '../pages/search/Search';
import Details from '../pages/details/Details';
import { useRoutes } from 'react-router-dom'


const Routers = () => {
    let routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/search/q=:id", element: <Search /> },
        { path: "/show/id=:id", element: <Details /> },
    ]);
    return routes
}

export default Routers