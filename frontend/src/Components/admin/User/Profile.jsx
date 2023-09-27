import { useState } from "react";
import UserReadWrite from "./UserReadWrite";
import RoomsHistory from "../history/RoomsHistory";
import QuetionsHistory from "../history/QuetionsHistory";
import { EscPress } from "../../Setings/Controllers";

import { Update, Save, Cancel } from "@material-ui/icons";

import UserSelected from "./UserSelected";

export default function Profile(props) {
    const { user } = props;

    const [showingHistoryQuestions, setShowingHistoryQuestions] = useState(false);
    const [idHistoryRoom, setIdHistoryRoom] = useState();

    const getIdHistoryRoom = (event) => {
        setIdHistoryRoom(event.currentTarget.id);
        setShowingHistoryQuestions(true);
    };
    const btnAdd = [
        {
            aria: "edit",
            color: "whitesmoke",
            background: "#4fcd3596",
            btn: <Update />,
        },
    ];

    const btnSave_Cancel = [
        {
            aria: "Save",
            color: "whitesmoke",
            background: "#4fcd3596",
            btn: <Save />,
        },
        {
            aria: "Cancel",
            color: "rgb(224, 93, 69)",
            background: "e5d0d0ab",
            btn: <Cancel />,
        },
    ];

    return (
        <div className="profile">
            <UserSelected
                user={user}
                edit={true}
                lstBtns={true ? btnAdd : btnSave_Cancel}
            />

            <div>
                <RoomsHistory user={user} getIdHistoryRoom={getIdHistoryRoom} />
            </div>
            {showingHistoryQuestions && (
                <div
                    tabIndex={0}
                    onKeyDown={(event) => {
                        EscPress(event, setShowingHistoryQuestions);
                    }}
                >
                    <QuetionsHistory
                        idUser={user.id}
                        idHistoryRoom={idHistoryRoom}
                        setShowingHistoryQuestions={setShowingHistoryQuestions}
                    />
                </div>
            )}
        </div>
    );
}
