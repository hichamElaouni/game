import { useState, useEffect, useRef } from "react"
import React from 'react'
import { addSubject, deleteSubject, addLevel, getSubjects, getLevels } from "../service/api"
import List from "../Setings/List";
import IconButton from "@material-ui/core/IconButton";

import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Yes from "@material-ui/icons/DoneOutline";
import Cancel from "@material-ui/icons/Cancel";


import {
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./subject.css"
export default function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [levels, setLevels] = useState();
    const [state, setState] = useState(true);
    const [stateAdd, setStateAdd] = useState(true);
    const [stateDelete, setStateDelete] = useState({ id: 0, state: false });

    const subject = useRef();

    const Subjects = async () => {
        const {
            data: { data, success },
        } = await getSubjects();
        if (!success) {
            console.log("error data");
        } else {
            setSubjects(data);
        }
    }
    useEffect(() => {
        Subjects()
    }, [stateAdd, stateDelete, state]);

    const deleteData = async () => {

        NotificationManager.success(
            " succufully  Deleted ",
            "info",
            3000,
            await deleteSubject(stateDelete.id)
        );

        setStateDelete(false);
    };

    const updateData = async () => {
        setState(false);
    };

    const saveData = async () => {
        setState(true);

    };
    const cancelData = async () => {
        setState(true);
    };
    const AddSubject = async () => {
        if (subject.current.value !== "")
            NotificationManager.success(
                " succufully  Adding ",
                "info",
                3000,
                await addSubject(subject.current.value)
            );

        setStateAdd(true);
    }

    return (
        <>
            <h1> Subjects </h1>
            <div className="listSubject">
                {
                    subjects.map((subject, key) => (
                        <List key={key} title={subject.name} id={subject.id} setStateDelete={setStateDelete} updateData={updateData} state={state} cancelData={cancelData} saveData={saveData} />
                    ))
                }
                <div className="btnadd">

                    {stateAdd ?
                        <IconButton
                            aria-label="add"
                            style={{
                                color: "whitesmoke",
                                background: "#4fcd3596",
                            }}
                            onClick={() => {
                                setStateAdd(false);
                            }}
                        >
                            <Add />
                        </IconButton>
                        :
                        <>
                            <input type="text " ref={subject} placeholder="enter name subject" style={{ paddingLeft: "3px" }} />
                            <IconButton
                                aria-label="Save"
                                style={{
                                    color: "whitesmoke",
                                    background: "#4fcd3596",
                                }}
                                onClick={AddSubject}
                            >
                                <Save />
                            </IconButton>

                        </>
                    }


                </div>
                {stateDelete.state ?

                    <div className="worning" > You Shore wanted delete this Subject
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                            width: "80%"
                        }}>

                            <IconButton
                                aria-label="Yes"
                                style={{
                                    color: "whitesmoke",
                                    background: "#4fcd3596",
                                }}
                                onClick={deleteData}
                            >
                                <Yes />
                            </IconButton>
                            <IconButton
                                aria-label="Cancel"
                                style={{
                                    color: "rgb(224, 93, 69)",
                                    background: "#e5d0d0ab",
                                    height: "100%",
                                    boxShadow: "0 0px 3px 0.2px brown"
                                }}
                                onClick={() => { setStateDelete({ state: false }) }}
                            >
                                <Cancel />
                            </IconButton>
                        </div>
                    </div> : null}
            </div>
        </>
    )
}
