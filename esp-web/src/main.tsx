import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Dashboard} from "./dashboard/Dashboard";
import Example from "./Example";
import {Auth0Provider} from "@auth0/auth0-react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>
    },
    {
        path: "/example",
        element: <Example/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://regen-network.auth0.com/api/v2/",
                scope: "read:current_user update:current_user_metadata"
            }}
        >
            <RouterProvider router={router}/>
        </Auth0Provider>
    </React.StrictMode>,
)
