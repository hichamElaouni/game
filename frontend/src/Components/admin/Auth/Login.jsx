import { useRef, useState, useEffect } from 'react'

import { addUser, getLogin } from "../../service/api"
import { NotificationManager } from "react-notifications";
import { passwordCheck, emailCheck } from "../../Setings/Controllers"
import Email from '@mui/icons-material/ContactMail';

import { useNavigate, useLocation } from "react-router-dom";

import { setAuthJwt, hasLoggedIn } from "../../service/auth";


import "./login.css";
import { Button } from '@mui/material';


import axios from "axios";
import FildCustem from '../../Setings/FildCustem';
import BsPerson from '@mui/icons-material/Person';


export default function Login({ setConnectionState }) {
    const refEmail = useRef();
    const refPassword = useRef();
    const refConfirm = useRef();
    const refFirst = useRef();
    const refLast = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [generatFilds, setGeneratFilds] = useState({
        state: false, data: [
            { icon: <Email />, ref: refEmail, type: "email", placeholder: "Email" },
            { icon: "", ref: refPassword, type: "password", placeholder: "Password" }]
    }
    );
    const [alert, setAlert] = useState({ state: false, message: "Login" });




    if (hasLoggedIn()) {
        return navigate(from, { replace: true });

    }

    //for test if email or password have some match
    // useEffect(()=>{
    //     const result =refDataTesting.test(refEmail)
    //     setEmail(result)
    // },[])

    //globel password check

    const LogIn = () => {
        setGeneratFilds({
            state: false, data: [
                { icon: <Email />, ref: refEmail, type: "email", placeholder: "Email" },
                { icon: "", ref: refPassword, type: "password", placeholder: "Password" }]
        })
    }
    const GoLogIn = async () => {
        if (refEmail.current.value !== "") {
            if (emailCheck(refEmail.current.value)) {
                if (
                    passwordCheck(refPassword.current.value)
                ) {

                    const credentials = { username: refEmail.current.value, password: refPassword.current.value };

                    const { status, data } = await getLogin(credentials);

                    if (status === 200) {
                        setAuthJwt(data);
                        setAlert({ state: false, message: "Sing in" });
                        setConnectionState(true)

                        navigate(from, { replace: true })

                    }
                    else {

                        setAlert({ state: true, message: "Email or password incorrect!" });
                    }

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


    const SingUp = () => {
        setGeneratFilds({
            state: true, data: [{ icon: <BsPerson />, ref: refFirst, type: "text", placeholder: "First Name" },
            { icon: <BsPerson />, ref: refLast, type: "text", placeholder: "Last Name" },
            { icon: <Email />, ref: refEmail, type: "email", placeholder: "Email" },
            { icon: "", ref: refPassword, type: "password", placeholder: "Password" },
            { icon: "", ref: refConfirm, type: "password", placeholder: "Confirm Password" }
            ]
        });
        setAlert({ message: "Singup" });
    }


    const GoSinup = async () => {


        if (refEmail.current.value !== "" && refPassword.current.value !== "" && refFirst.current.value !== "" && refLast.current.value !== "") {
            if (emailCheck(refEmail.current.value)) {
                if (
                    passwordCheck(refPassword.current.value)
                ) {

                    const user = { last_name: refLast.current.value, first_name: refFirst.current.value, email: refEmail.current.value, password: refPassword.current.value }

                    let auth = true;

                    const { status, data } = await addUser(user);


                    if (auth) {

                        if (status === 203) {
                            setAlert({ state: true, message: "Email already exists Try Login or Another Email" });

                        } else if (status === 201) {
                            setAuthJwt(data);
                            setAlert({ state: false, message: "Sing in" });
                            setConnectionState(true)
                            navigate(from, { replace: true });

                        }
                        else {

                            setAlert({ state: true, message: "Email or password incorrect!" });
                        }

                    } else {
                        setAlert({ state: true, message: "User not authenticated " });

                    }


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
                "enter your Data firse",
                2000
            );
        }






    }
    const CustStyle = {
        backgroundColor: " #147171",
        color: "white",
        border: "1px solid"
    }

    return (
        <div style={{ display: "flex" }}>

            <div className='formSing'>
                <div className='loginForm'>
                    <div className='logoSing'></div>
                    <div className='containerSing'>

                        <div className="divBtns">
                            <Button style={!generatFilds.state ? CustStyle : null} onClick={LogIn}>Login</Button>
                            <Button style={generatFilds.state ? CustStyle : null} onClick={SingUp}>SingUp</Button>
                        </div>

                        <label> {alert.state && alert.message}</label>
                        <div className='divTxt'>

                            {
                                generatFilds.data.map((fild, key) => {

                                    return <FildCustem key={key} Icon={fild.icon} refFild={fild.ref} type={fild.type} placeholder={fild.placeholder} />
                                })
                            }
                            <div className="divBtns" style={{ position: "relative" }}>
                                <Button onClick={() => { generatFilds.state ? GoSinup() : GoLogIn() }}>Go</Button>
                            </div>
                        </div>
                        {/* <div className='divChck'>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" style={{ width: "24px", height: "24px", marginRight: "3px" }} />Remember Me
                        </div>
                        <a href="http://forgotPassword">forgotPassword</a>
                    </div> */}



                    </div>
                </div>
            </div>
        </div>
    )
}
