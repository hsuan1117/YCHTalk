import Login from "./pages/Login";

require("./bootstrap");
import React, {Fragment, lazy, Suspense} from "react";
import {Route} from "react-router";
import {
    BrowserRouter,
    Routes
} from "react-router-dom";
import ReactDOM, {render} from "react-dom";
import Home from "./pages/Home";
import ChatScene from "./components/ChatScene";
import keycloak from "./keycloak";
import SingleLogin from "./pages/SingleLogin";
const { ReactKeycloakProvider } = require('@react-keycloak/web')

render(
    <BrowserRouter>
        <ReactKeycloakProvider authClient={keycloak}>
            <Routes>
                <Route path="/">
                    <Route element={<Home/>} path="/"      index  />
                    <Route element={<ChatScene/>} path="/chat"        />
                    <Route element={<Login/>} path="/login"        />
                </Route>
            </Routes>
        </ReactKeycloakProvider>
    </BrowserRouter>,
    document.getElementById("root")
)
