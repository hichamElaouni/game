import React, { useRef, useState, useEffect } from 'react'

import Person from "@mui/icons-material/Person";
import { login } from "../../../service/api"
import { NotificationManager } from "react-notifications";

import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { setAuthJwt, hasLoggedIn } from "../../../service/auth";


import "./login.css";
import { Button } from '@mui/material';
import FildPassword from '../../../Setings/FildPassword';

import axios from "axios";

export default function Login(props) {
    const { setAuth, setUser, user } = props;
    const refEmail = useRef();
    const refPassword = useRef();

    const [alert, setAlert] = useState({ state: false, message: "Sing in" });
    let navigate = useNavigate();



    if (hasLoggedIn()) {
        return <Navigate to="/" />;
    }

    //for test if email or password have some match
    // useEffect(()=>{
    //     const result =refDataTesting.test(refEmail)
    //     setEmail(result)
    // },[])

    //globel password check

    const SingIn = async () => {

        if (refEmail.current.value !== "") {

            if (refEmail.current.value.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
                if (
                    refPassword.current.value.match(
                        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    )
                ) {

                    const credentials = { username: refEmail.current.value, password: refPassword.current.value };
                    const {
                        REACT_APP_BACKEND_URL = "localhost",
                        REACT_APP_BACKEND_PORT = 3000,
                    } = process.env || {};

                    const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;
                    const { status, data } =
                        (await axios
                            .post(`http://${fullUrl}/login`, credentials)
                            .catch((error) => {

                            })) || {};

                    if (status === 200) {
                        setAuthJwt(data);
                        setAlert({ state: false, message: "Sing in" });
                        navigate("/");
                    } else {
                        setAlert({ state: true, message: "Email or password incorrect!" });
                    }

                    // if (status === 200) {
                    //     console.log("sdfs", data);
                    //     setAuthJwt(data);
                    //     setUser(data);
                    //     navigate("/");
                    // } else {
                    //     setAlert({ state: true, message: "message" });

                    // }
                } else {
                    NotificationManager.warning(
                        "Warning message",
                        "Password Not Correct",
                        2000
                    );
                }
            } else {
                NotificationManager.warning(
                    "Warning message",
                    "Email Not Correct",
                    2000
                );
            }
        } else {
            NotificationManager.warning(
                "Warning message",
                "enter your Email firse",
                2000
            );
        }
    };

    return (
        <>
            <div className='loginForm'>
                <div className='logoSing'></div>
                <div className='containerSing'>
                    <label> {alert.message}</label>
                    <div className='divTxt'>
                        <div className="filds">
                            <Person />
                            <input type="text" placeholder='Email' required ref={refEmail} />
                        </div>
                        <FildPassword refPassword={refPassword} />
                    </div>
                    <div className='divChck'>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" style={{ width: "24px", height: "24px", marginRight: "3px" }} />Remember Me
                        </div>
                        <a href="http://forgotPassword">forgotPassword</a>
                    </div>
                    <div className="divBtns">
                        <Button onClick={SingIn}>Login</Button>
                        {/* <Button>Regester</Button> */}
                    </div>
                </div>

            </div>
        </>
    )
}