import { useState, useEffect, useRef } from "react";
import { getAllHistoryQuestions } from "../../service/api";

import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

export default function QuetionsHistory(props) {
    const { idHistoryRoom, idUser, setShowingHistoryQuestions } = props;
    const [historyQuestions, setHistoryQuetios] = useState([]);
    const [limit, setLimit] = useState(10);


    const getHistoryQuestions = async (idHistoryRoom, idUser, page = 1, limit) => {
        const {
            data: { data, success },
        } = await getAllHistoryQuestions(idHistoryRoom, idUser, page, limit);
        if (!success) console.log("error data");
        else {
            setHistoryQuetios(data);
        }
    };

    useEffect(() => {
        getHistoryQuestions(idHistoryRoom, idUser, limit);

    }, [limit]);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollHeight - scrollTop === clientHeight) {
            setLimit(prev => prev + 10)
        }
    };
    return (
        <div className="questiosHistory">
            <IconButton
                aria-label="Close"
                style={{
                    color: "whitesmoke",
                    background: "#4fcd3596",
                    margin: ".5rem",
                }}
                onClick={() => {
                    setShowingHistoryQuestions(false);
                }}
            >
                <Close />
            </IconButton>
            <div className="history-Tab" onScroll={(event) => { handleScroll(event) }}>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Current Answer</th>
                            <th>Your Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyQuestions.map((question, index) => (
                            <tr
                                key={index}
                                style={
                                    question.currentAnswer === question.currentselected
                                        ? { backgroundColor: "#045310" }
                                        : { backgroundColor: "#c10909e5" }
                                }
                            >
                                <td>{question.title}</td>

                                {question.picture ? (
                                    <>
                                        <td>
                                            <img
                                                src={question.currentAnswer}
                                                loading="lazy"
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src={question.currentselected}
                                                loading="lazy"
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{question.currentAnswer}</td>
                                        <td>{question.currentselected}</td>
                                    </>
                                )}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
