
import React, { Fragment } from 'react'
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";
import Update from "@material-ui/icons/UpdateSharp";

import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";


export default function List(props) {
    const { id, title, setStateDelete, updateData, state, saveData, cancelData } = props
    return (
        <div className='list'>
            <h3>{title}</h3>
            {state ?
                <div className='actions'>
                    <IconButton
                        aria-label="delete"
                        style={{
                            color: "rgb(224, 93, 69)",
                            background: "#e5d0d0ab",
                            height: "100%",
                        }}
                        id={id}
                        onClick={() => {
                            setStateDelete({ id, state: true })
                        }}
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        aria-label="updete"
                        style={{
                            color: "whitesmoke",
                            background: "#4fcd3596",
                            height: "100%",
                        }}
                        id={id}
                        onClick={(event) => {
                            updateData(event);
                        }}
                    >
                        <Update />
                    </IconButton>

                </div>
                :
                <div className='actions'>
                    <IconButton
                        aria-label="Save"
                        style={{
                            height: "100%",
                            color: "whitesmoke",
                            background: "#4fcd3596",
                        }}
                        onClick={(event) => {
                            saveData(event);
                        }}
                    >
                        <Save />
                    </IconButton>
                    <IconButton
                        aria-label="Cancel"
                        style={{
                            color: "rgb(224, 93, 69)",
                            background: "#e5d0d0ab",
                            height: "100%",
                        }}
                        onClick={() => {
                            cancelData();
                        }}
                    >
                        <Cancel />
                    </IconButton>
                </div>

            }
        </div>
    )
}
