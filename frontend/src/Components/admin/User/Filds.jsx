import { useRef } from "react";
import CustemSelect from "../../Setings/CustemSelect";


export default function Filds(props) {
    const { title, name, defaultValue, role, id, style, type, showHistory, getDataUser } = props;
    if (type)
        if (defaultValue == undefined || defaultValue === "" || defaultValue === 0) return

    return (
        <div className="fild">
            <h1>{title}</h1>
            {
                type ?
                    name === "fullName" ? <h2 id={id} style={style} onClick={(event) => showHistory(event)}>{defaultValue}</h2> :
                        <h2>{defaultValue}</h2>
                    : name === "role_Id" ? (
                        <CustemSelect
                            defaultValue={defaultValue}
                            name={name}
                            onchange={getDataUser}
                            role={role}
                        />
                    ) : (
                        <input
                            type={"text"}
                            placeholder={title.toUpperCase()}
                            name={name}
                            disabled={
                                name === "email" ? true : null
                            }
                            defaultValue={defaultValue}
                            onChange={(event) => getDataUser(event)}
                        ></input>
                    )
            }
        </div>
    )
}
