import React, { Fragment, useState } from 'react'
import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";


export default function FildCustem(props) {
    const { refFild, placeholder, type, Style, Icon } = props;
    const [typeInputPassword, setTypeInputPassword] = useState(false);
    return (
        <div className="filds">
            {
                type === "password" ?
                    <Fragment>

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
                    </Fragment>
                    : Icon}
            <input
                type={type === "password" ? typeInputPassword ? "text" : "password" : type}
                placeholder={placeholder}
                ref={refFild}
                style={Style}
            />
        </div>
    )
}

