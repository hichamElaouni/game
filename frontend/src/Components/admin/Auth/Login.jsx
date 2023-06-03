import { useRef, useState } from 'react'

import { getLogin } from "../../service/api"
import { NotificationManager } from "react-notifications";
import { PasswordCheck, EmailCheck } from "../../Setings/Controllers"

import { useNavigate, useLocation } from "react-router-dom";
import { setAuthJwt, hasLoggedIn } from "../../service/auth";

import "./login.css";

import FormLogin from '../../Setings/FormLogin';


export default function Login({ setConnectionState }) {
    const Email = useRef();
    const Password = useRef();
    const Confirm = useRef();
    const First = useRef();
    const Last = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [alert, setAlert] = useState({ state: false, message: "Login" });

    if (hasLoggedIn()) {
        return navigate(from, { replace: true });

    }

    //for test if email or password have some match
    // useEffect(()=>{
    //     const result =refDataTesting.test(Email)
    //     setEmail(result)
    // },[])

    //globel password check


    const LogIn = async () => {
        if (Email.current.value !== "") {
            if (EmailCheck(Email.current.value)) {
                if (
                    PasswordCheck(Password.current.value)
                ) {
                    const credentials = { username: Email.current.value, password: Password.current.value };
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
        <div className='formSing'>
            <div className='loginForm'>
                <div className='logoSing'></div>
                <div className='containerSing'>

                    <FormLogin btnFirst="LOGIN" btnSecond="SINGUP"
                        messageError={alert}
                        setMessageError={setAlert}
                        StartedFunction={LogIn}
                        navigate={navigate}
                        setConnectionState={setConnectionState}
                        setAuthJwt={setAuthJwt}
                        from={from}

                        refs={{ Email, Password, Confirm, Last, First }}
                    />


                    {/* <div className='divChck'>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" style={{ width: "24px", height: "24px", marginRight: "3px" }} />Remember Me
                        </div>
                        <a href="http://forgotPassword">forgotPassword</a>
                    </div> */}



                </div>
            </div>
        </div>
    )
}
