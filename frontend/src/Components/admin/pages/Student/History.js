import React, { useEffect, useRef, useState } from "react";
import { getRoomsHistory, getAllHistoryQuestions } from "../../../service/api";
import Rounds from "./Rounds";

export default function History(props) {
    const { Student } = props;

    const limit = useRef(10);
    const page = useRef(1);
    const [student, setStudent] = useState(Student);
    const [questionsHistory, setQuestionsHistory] = useState();

    const refEffect = useRef(false);
    const refTable = useRef("");
    let RoomsHistory = useRef([]);

    useEffect(() => {
        if (refEffect.current) {
            const getHistoryRooms = async () => {
                const {
                    data: { data, success },
                } = await getRoomsHistory(student.id, limit.current, page.current);
                if (!success) console.log("error data");
                else {

                    RoomsHistory.current = [];

                    data.map((room) => {

                        const { Rooms, Student, ...rest } = room;
                        RoomsHistory.current = [
                            ...RoomsHistory.current,
                            {
                                idStudent: Student.id,
                                nameStudent: Student.fullName,
                                nameRoom: Rooms.nameRoom,
                                ...rest,
                            },
                        ];

                    });


                }
                getHistoryQuestions(data[0].id, Student.id)
            };
            getHistoryRooms();

        }
        // refTable.current.focus();
        return () => {
            refEffect.current = true;
        };
    }, [student, limit.current, page.current]);




    const getHistoryQuestions = async (idRoomHistory, idStudent) => {
        const {
            data: { data, success },
        } = await getAllHistoryQuestions(idRoomHistory, idStudent);
        if (!success) console.log("error data");
        else {
            let history = [];
            data.map((result) => {
                const { Question, ...rest } = result;
                history = [...history, { ...Question, selectedAnswer: rest.selectedAnswer }]
            })

            setQuestionsHistory(history)
        }
    }


    const Style = {
        background: "#79746e1a",
        textAlign: "center",
        fontSize: "1.4em",
        borderBottom: "3px solid silver",

    }

    return (
        <>
            <div className="ShartQuestion">
                <div className="div-Shart">
                    <h1>Shart for Leter</h1>
                </div>
                <div className="historyQuestions">
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>Selected Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questionsHistory !== undefined && questionsHistory.map((question, key) => (

                                <tr key={key} className={question.answer === question.selectedAnswer ? "trueAnswer" : "falseAnswer"} style={{ cursor: "pointer" }}>
                                    <td>{question.title}</td>
                                    <td>{question.answer}</td>
                                    <td>{question.selectedAnswer}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="line-3"></div>
            <h3 style={Style}>Student {student.fullName} was played with :</h3>
            <div className="historyRounds">
                {RoomsHistory.current.map((rooms, key) => (
                    <Rounds
                        key={key}
                        Room={rooms}
                        setStudent={setStudent}
                        getHistoryQuestions={getHistoryQuestions}

                    />
                ))}
            </div>
        </>
    );
}
