require("./bootstrap");
import { Route } from "react-router";
import {
    BrowserRouter,
    Routes
} from "react-router-dom";
import ReactDOM, {render} from "react-dom";
import Home from "./components/Home";
import Second from "./components/Second";
import ChatScene from "./components/ChatScene";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route element={<Second />} />
                <Route element={<ChatScene />} path="/chat"/>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
)
