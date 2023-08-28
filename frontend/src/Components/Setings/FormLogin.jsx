import { useState } from 'react'
import { socket } from "../service/socket";

import { Button } from '@mui/material';
import IEmail from '@mui/icons-material/ContactMail';

import FildCustem from './FildCustem';
import BsPerson from '@mui/icons-material/Person';

import { addUser } from "../service/api"

import { useNavigate, useLocation } from "react-router-dom";
import { setAuthJwt, } from "../service/auth";

import {
    NotificationManager,
} from "react-notifications";
import { EmailCheck, PasswordCheck } from './Controllers';



export default function FormLogin(props) {
    const { btnFirst,
        btnSecond,
        StyleForm,
        style_Button_Bottom,
        style_Button_top,
        styleFild,
        messageError,
        setMessageError,
        StartedFunction,
        CustStyle,
        tokenParams,
        refs,
    } = props;

    const { Email, Password, Confirm, First, Last } = refs;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [generatFilds, setGeneratFilds] = useState({
        state: false, data: [
            { icon: <IEmail />, ref: Email, type: "email", placeholder: "Email" },
            { icon: "", ref: Password, type: "password", placeholder: "Password" }]
    });

    const start = () => {
        setGeneratFilds({
            state: false, data: [
                { icon: <IEmail />, ref: Email, type: "email", placeholder: "Email" },
                { icon: "", ref: Password, type: "password", placeholder: "Password" }]
        });
    };

    const Create = () => {
        setGeneratFilds({
            state: true, data: [{ icon: <BsPerson />, ref: First, type: "text", placeholder: "First Name" },
            { icon: <BsPerson />, ref: Last, type: "text", placeholder: "Last Name" },
            { icon: <IEmail />, ref: Email, type: "email", placeholder: "Email" },
            { icon: "", ref: Password, type: "password", placeholder: "Password" },
            { icon: "", ref: Confirm, type: "password", placeholder: "Confirm Password" }
            ]
        });
    };


    const CreateAccount = async () => {
        if (Email.current.value !== "" && Password.current.value !== "" && First.current.value !== "" && Last.current.value !== "") {
            if (EmailCheck(Email.current.value)) {
                if (
                    PasswordCheck(Password.current.value)
                ) {
                    const user = { last_name: Last.current.value, first_name: First.current.value, email: Email.current.value, password: Password.current.value }
                    let auth = true;
                    const { status, data } = await addUser(user);

                    if (auth) {
                        if (status === 203) {
                            setMessageError({ state: true, message: "Email already exists Try Login or Another Email" });
                        } else if (status === 201) {
                            if (tokenParams) {
                                socket.emit("joinRoom", tokenParams, data.result);
                            } else {
                                setAuthJwt(data);
                                setMessageError({ state: false, message: "Sing in" });
                                navigate(from, { replace: true });
                            }
                        }
                        else {
                            setMessageError({ state: true, message: "Email or password incorrect!" });
                        }
                    } else {
                        setMessageError({ state: true, message: "User not authenticated " });
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

    const StyleActiveBtn = CustStyle ? CustStyle : {
        backgroundColor: " #147171",
        color: "white",
        border: "1px solid"
    }

    return (
        <div className='generetedForm' style={StyleForm}>
            <div className="btns-genereted_form" style={style_Button_top}>
                <Button style={!generatFilds.state ? StyleActiveBtn : null} onClick={start}>{btnFirst}</Button>
                <Button style={generatFilds.state ? StyleActiveBtn : null} onClick={Create}>{btnSecond}</Button>
            </div>
            {messageError.state ? <label className='error'>{messageError.message}</label> : <></>}
            <div className="generetedfilds" >
                {
                    generatFilds.data.map((fild, key) => {
                        return <FildCustem key={key} Icon={fild.icon} refFild={fild.ref} type={fild.type} placeholder={fild.placeholder} Style={styleFild} />
                    })
                }
            </div>
            <div className="btns-genereted_form" style={style_Button_Bottom}>
                <Button onClick={() => { !generatFilds.state ? StartedFunction() : CreateAccount() }}>Submit</Button>
            </div>
        </div>
    )
}
