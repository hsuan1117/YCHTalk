import React, {Component, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const Home = () => {
    const { keycloak } = useKeycloak()
    const {id, setId} = useState('');
    const init = useRef(true);
    useEffect(() => {
        if (init.current) {
            init.current = false;

            const fetchData = async () => {
                // STEP 2：使用 Promise.all 搭配 await 等待兩個 API 都取得回應後才繼續

                let res = await axios.get('/api/session', { withCredentials: true })
                console.log(res.data)
            };
            fetchData().then();
        }
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">Home</div>

                        <div>User is {!keycloak?.authenticated ? 'NOT ' : ''} authenticated</div>

                        {!!keycloak?.authenticated && (
                            <button type="button" onClick={() => keycloak.logout()}>
                                Logout
                            </button>
                        )}
                    <hr/>
                        <Link to="/chat">Chat</Link>
                        <Link to="/login">Login</Link>
                        <p>{id}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Home;
