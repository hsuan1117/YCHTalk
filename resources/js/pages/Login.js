import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const Login = () => {
    const init = useRef(true);
    useEffect(() => {
        if (init.current) {
            init.current = false;

        }
    }, []);
    const location = useLocation()
    const currentLocationState = location.state || {
        from: { pathname: '/home' },
    }
    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])

    if (keycloak?.authenticated)
        { // @ts-ignore
            return <Navigate to={currentLocationState?.from} />
        }

    return (
        <div>
            <button type="button" onClick={login}>
                Login
            </button>
        </div>
    )
}
export default Login;
