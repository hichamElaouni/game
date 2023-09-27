import React from 'react'
import UserReadWrite from "./UserReadWrite";
import CustomBtns from "../../Setings/CustomBtns1";

export default function UserSelected(props) {
    const { user, role_id, showHistory, edit, getDataUser, lstBtns } = props
    return (

        <div className="userSelected">
            <UserReadWrite user={user} role_id={role_id} showHistory={showHistory} edit={edit} getDataUser={getDataUser} />
            <div className="Btns-singl-User">
                <CustomBtns lstBtns={lstBtns} />
            </div>
        </div>

    )
}
