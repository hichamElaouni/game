
import React, { Fragment } from 'react'
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";
import Update from "@material-ui/icons/UpdateSharp";




export default function List(props) {
    const { id, title, setStateDelete, updateData } = props
    return (
        <div className='list'>
            <h3>{title}</h3>



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
                    onClick={() => {
                        updateData(id);
                    }}
                >
                    <Update />
                </IconButton>

            </div>


        </div>
    )
}
