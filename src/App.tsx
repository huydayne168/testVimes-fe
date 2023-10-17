import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Form from "./page/Form/Form";
import List from "./page/List/List";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <Form />,
                index: true,
            },
            {
                path: "list",
                element: <List />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
