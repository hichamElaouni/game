import { useState, useEffect, useRef, Fragment } from "react"
import React from 'react'
import { addSubject, deleteSubject, addLevel, getSubjects, getLevels, deleteLevel, updateSubject, updateLevel } from "../service/api"
import List from "../Setings/List";
import Edit from "./Edit";

import IconButton from "@material-ui/core/IconButton";

import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Yes from "@material-ui/icons/DoneOutline";
import Cancel from "@material-ui/icons/Cancel";


import {
    NotificationManager,
} from "react-notifications";

import "./subject.css"
export default function Subjects(props) {
    const { flag } = props;
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [state, setState] = useState(true);
    const [stateAdd, setStateAdd] = useState(true);
    const [stateDelete, setStateDelete] = useState({ id: 0, state: false });



    const refData = useRef();


    const getData = async () => {
        console.log("getData");
        const {
            data: { data, success },
        } = flag ? await getSubjects() : await getLevels();
        if (!success) {
            console.log("error data");
        } else {
            setData(data);
        }
    }

    useEffect(() => {
        getData();
    }, [stateAdd, stateDelete, state, flag]);




    const deleteData = async () => {

        NotificationManager.success(
            " succufully  Deleted ",
            "info",
            3000,
            await flag ? deleteSubject(stateDelete.id) : deleteLevel(stateDelete.id)
        );

        setStateDelete(false);
    };



    const updateData = async (id) => {
        setEditId(id);

        setState(false);
    };

    const saveData = async () => {

        flag ? await updateSubject(editId, refData) : await updateLevel(editId, refData)

        setEditId(null)
        setState(true);

    };


    const cancelData = async () => {
        setEditId(null)
        setState(true);
    };

    const AddData = async () => {
        if (refData.current !== "")
            NotificationManager.success(
                " succufully  Adding ",
                "info",
                3000,
            );
        flag ? await addSubject(refData.current.value) : addLevel(refData.current.value)

        setStateAdd(true);
    }

    return (
        <div id="Subjects">
            <h1 style={{ cursor: "pointer" }}>{flag ? "Subjects" : "Levels"}</h1>
            <div className="listSubject">
                {



                    data.map((result, key) => (
                        <Fragment key={key}>

                            {editId == result.id ?
                                <Edit refData={refData}
                                    title={flag ? result.name : result.levelNumber}
                                    cancelData={cancelData}
                                    saveData={saveData} />
                                :
                                <List
                                    id={result.id}
                                    refData={refData}
                                    title={flag ? result.name : result.levelNumber}
                                    setStateDelete={setStateDelete}
                                    updateData={updateData}


                                />}
                        </Fragment>
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
                            <input type="text " ref={refData} placeholder={flag ? "enter name the Subject" : "enter the Level "} style={{ paddingLeft: "3px" }} />
                            <IconButton
                                aria-label="Save"
                                style={{
                                    color: "whitesmoke",
                                    background: "#4fcd3596",
                                }}
                                onClick={AddData}
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
        </div>
    )
}
