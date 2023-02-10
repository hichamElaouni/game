import React, { useState } from 'react'
import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";


export default function FildPassword(props) {
    const { refPassword, title } = props;
    const [typeInputPassword, setTypeInputPassword] = useState(false);
    return (
        <div className="filds">
            {typeInputPassword ? (
                <LockOpen
                    onClick={() => {
                        setTypeInputPassword(false);
                    }}
                />
            ) : (
                <Lock
                    onClick={() => {
                        setTypeInputPassword(true);
                    }}
                />
            )}
            <input
                type={typeInputPassword ? "text" : "password"}
                placeholder="Entre your Password ..."
                ref={refPassword}
                defaultValue={title}
            />
        </div>
    )
}

