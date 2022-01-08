import Login from "./pages/Login";

require("./bootstrap");
import React, {Fragment, lazy, Suspense} from "react";
import {Route} from "react-router";
import {
    BrowserRouter,
    Routes
} from "react-router-dom";
import ReactDOM, {render} from "react-dom";
import ChatScene from "./pages/ChatScene";
import keycloak from "./keycloak";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import {Outlet} from "react-router";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
const {ReactKeycloakProvider} = require('@react-keycloak/web')

function LayoutWithNavBar(){
    return (
        <>
            <Nav />
            <Outlet />
            <Footer/>
        </>
    );
}

render(
    <BrowserRouter>
        <ReactKeycloakProvider authClient={keycloak}>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<LayoutWithNavBar/>}>
                    <Route element={<Home/>} path="/" index/>

                    <Route element={<Login/>} path="/login"/>
                </Route>

                <Route element={<ChatScene/>} path="/chat"/>
            </Routes>
        </ReactKeycloakProvider>
    </BrowserRouter>,
    document.getElementById("root")
)
