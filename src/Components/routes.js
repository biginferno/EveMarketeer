import React from "react";
import Frontpage from './Frontpage/frontpage'
import Market from "./EveMarketeer/Market/Market";
import EveIndex from './EveIndex/EveIndex'
import About from './About/About'
import { useRoutes } from "react-router-dom";
function Routes() {
        let routes = useRoutes([
            {
                path: "/",
                element: <Frontpage />
            },
            {
                path: "/market",
                children: [
                    {index: true, element: <Market/>},
                    {path: ":itemId", element: <Market/>}
                ]
            },
            {
                path: "/eveindex",
                children: [
                    {index: true, element: <EveIndex />},
                    {path: ":itemId", element: <EveIndex />}
                ]
            },
            {
                path: "/about",
                element: <About />
            }
        ])

        return routes;
}

export default Routes;