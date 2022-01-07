import Login from "./pages/Login";

require("./bootstrap");
import {Route} from "react-router";
import {
    BrowserRouter,
    Routes
} from "react-router-dom";
import ReactDOM, {render} from "react-dom";
import Home from "./pages/Home";
import ChatScene from "./components/ChatScene";
import keycloak from "./keycloak";
const { ReactKeycloakProvider } = require('@react-keycloak/web')

render(
    <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<Home/>} path="/home"      index  />
                    <Route element={<Login/>} path={"/login"}         />
                    <Route element={<ChatScene/>} path="/chat"        />
                </Route>
            </Routes>
        </BrowserRouter>
    </ReactKeycloakProvider>,
    document.getElementById("root")
)
