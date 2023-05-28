import React from 'react';
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";


export default function Edit(props) {
    const { refData, title, saveData, cancelData } = props
    return (
        <div className='list'>
            <input type="text" ref={refData} defaultValue={title} />

            <div className='actions'>
                <IconButton
                    aria-label="Save"
                    style={{
                        height: "100%",
                        color: "whitesmoke",
                        background: "#4fcd3596",
                    }}
                    onClick={() => {
                        saveData();
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
        </div>
    )
}
