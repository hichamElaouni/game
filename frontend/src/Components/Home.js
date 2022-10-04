//multi rander ;multi insert ;update room hisroty; type var
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  getQuestionByRoom,
  addRoomHistory,
  addQuestionHistory,
  updateRoomHistory,
  updateStudent,
} from "./service/api";
import Question from "./Question/Question";
import Game from "./TicTacToe/Game";
import Waiting from "./waiting/Waiting";
import { ScoreBoard } from "./Score/ScoreBoard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { socket } from "./service/socket";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const [visible, setVisible] = useState(true);
  const [turn, setTurn] = useState(true);
  const [pauseGame, setPauseGame] = useState(true);

  const [over, setOver] = useState(false);

  const [stateRoom, setStateRoom] = useState(false);

  const [waitState, setWaitState] = useState({
    state: false,
    message: "Wait to anothor Player to Join",
  });

  const scores = useRef({ xScore: 0, oScore: 0, xGameScore: 0, oGameScore: 0 });

  const [lastId, setlastId] = useState(0);
  const [roomQuestions, setRoomQuestions] = useState([]);

  const [studentsPlay, setStudentsPlay] = useState([{}, {}]);
  // const [student, setStudent] = useState({});

  const [idHistoryRoom, setIdHistoryRoom] = useState(0);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  let navigate = useNavigate();
  const flagGame = useRef(true);
  let indexPlayer = 0;
  let student = useRef({});
  let Room = {};
  const xPlaying = useRef();
  const refRoom = useRef(true);

  if (localStorage.getItem("dataStudent") === null) {
    navigate("/JoinRoom?token=" + token);
  } else {
    const {
      indexPlayer: index,
      student: data,
      room,
    } = JSON.parse(localStorage.getItem("dataStudent"));
    indexPlayer = index;
    student.current = data;
    Room = room;
  }

  const updatePoint = async (id, point, victories, losses) => {
    let pointPlayer = student.current.point + point;
    let victoriesPlayer = student.current.victories + victories / Room.point;
    let lossesPlayer = student.current.losses + losses / Room.point;
    const studentData = {
      ...student,
      point: pointPlayer,
      victories: victoriesPlayer,
      losses: lossesPlayer,
    };

    await updateStudent(id, studentData);
  };

  const roundOver = async () => {
    if (over && flagGame.current) {
      let MsgOver;
      let roomHistory = {};

      if (scores.oScore < scores.xScore) {
        roomHistory = {
          idStudent_1: studentsPlay[0].idStudent,
          idStudent_2: studentsPlay[1].idStudent,
          idRoom: Room.id,
          victories: 3,
          losses: 2,
          roundPlay: 6,
        };

        MsgOver =
          "Game over, " +
          studentsPlay[0].fullName +
          " 'X'  win the Game with Total Points =  " +
          scores.xScore +
          " Vs " +
          studentsPlay[1].fullName +
          " 'O' Points = " +
          scores.oScore;
        updatePoint(
          studentsPlay[0].idStudent,
          scores.xScore,
          scores.xGameScore,
          scores.oGameScore
        );
      } else if (scores.oScore > scores.xScore) {
        roomHistory = {
          idStudent_1: studentsPlay[1].idStudent,
          idStudent_2: studentsPlay[0].idStudent,
          IdRoom: Room.id,
          victories: 3,
          losses: 2,
          roundPlay: 6,
        };

        MsgOver =
          "Game over, " +
          studentsPlay[1].fullName +
          " 'O' win the Game with Total Points =  " +
          scores.oScore +
          " Vs " +
          studentsPlay[0].fullName +
          " 'X' Points =  " +
          scores.xScore;
        updatePoint(
          studentsPlay[1].idStudent,
          scores.oScore,
          scores.oGameScore,
          scores.xGameScore
        );
      } else {
        MsgOver = "Game Is Over No One Wins, Score Players = " + scores.oScore;
        updatePoint(studentsPlay[0].idStudent, scores.oScore / 2, 0, 0);
        updatePoint(studentsPlay[1].idStudent, scores.oScore / 2, 0, 0);
      }

      await updateRoomHistory(idHistoryRoom, roomHistory);

      indexPlayer * 1 === 1
        ? socket.emit("setGameOver")
        : socket.emit("setOver", MsgOver);
    }
  };

  useEffect(() => {
    if (indexPlayer * 1 === 1) {
      setTurn(true);
      xPlaying.current = true;
      setStateRoom(true);
      setVisible(false);
    }

    if (indexPlayer * 1 === 2) {
      setTurn(false);
      xPlaying.current = false;
      setStateRoom(false);

      socket.emit("setStateRoom", {
        indexPlayer: indexPlayer,
        idStudent: student.current.id,
        point: student.current.point,
        victories: student.current.victories,
        fullName: student.current.fullName,
      });
    }
  }, []);

  //Player 1
  useEffect(() => {
    socket.on(
      "getStateRoom",
      async ({ indexPlayer: index, idStudent, point, victories, fullName }) => {
        if (Room.id !== undefined) {
          if (refRoom.current) {
            setStudentsPlay([
              {
                indexPlayer: index,
                idStudent: student.current.id,
                fullName: student.current.fullName,
                point: student.current.point,
                victories: student.current.victories,
              },
              {
                indexPlayer,
                idStudent,
                fullName,
                point,
                victories,
              },
            ]);

            setStateRoom(false);
            setVisible(true);
            const { data } = await addRoomHistory({
              idStudent_1: student.current.id,
              idStudent_2: idStudent,
              idRoom: Room.id,
              victories: 0,
              losses: 0,
              roundPlay: 0,
            });

            setIdHistoryRoom(data.idHistoryRoom);

            socket.emit("setStudents", {
              indexPlayer: indexPlayer,
              idStudent: student.current.id,
              fullName: student.current.fullName,
              point: student.current.point,
              victories: student.current.victories,
              idHistoryRoom: data.idHistoryRoom,
            });
          }
        }
      }
    );
    if (refRoom.current) {
      socket.on(
        "getStudents",
        ({
          indexPlayer: index,
          idStudent,
          fullName,
          point,
          victories,
          idHistoryRoom,
        }) => {
          setStudentsPlay([
            { indexPlayer: index, idStudent, fullName, point, victories },
            {
              indexPlayer: indexPlayer,
              idStudent: student.current.id,
              fullName: student.current.fullName,
              point: student.current.point,
              victories: student.current.victories,
            },
          ]);
          setIdHistoryRoom(idHistoryRoom);
        }
      );
    }

    socket.on("getGameOver", () => {
      setOver(true);
      setWaitState({ ...waitState, state: true });
    });

    socket.on("getOver", (MsgOver) => {
      setStateRoom(true);
      setWaitState({ state: true, message: MsgOver });
    });

    return () => {
      refRoom.current = false;
    };
  }, []);

  useEffect(() => {
    const getQuestion = async (token, id, setRoomQuestions) => {
      const {
        data: { data, success, limit },
      } = await getQuestionByRoom({ token, id });
      if (!success) console.log("error data");
      else {
        if (turn && limit) {
          console.log("Game Over");
          setOver(true);
        } else {
          setRoomQuestions(data);
        }
      }
    };
    getQuestion(token, lastId, setRoomQuestions);
  }, [lastId]);

  const { Question: questions } = roomQuestions[0] || {};

  useEffect(() => {
    window.onbeforeunload = function () {
      localStorage.clear();
    };

    socket.on("disconnected", (Student) => {
      NotificationManager.info(
        "Player " + Student.fullName + " disconnected you Win.",
        "Information",
        3000
      );
      setOver(true);
      roundOver();
    });
  }, []);

  return (
    <>
      <div className={`PartGames `}>
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              student={student}
              setVisible={setVisible}
              setPauseGame={setPauseGame}
              scores={scores}
              count={Room.TimeTurn || 15}
              setlastId={setlastId}
              lastId={lastId}
              indexPlayer={indexPlayer}
              questions={questions}
              idHistoryRoom={idHistoryRoom}
              addQuestionHistory={addQuestionHistory}
            />
          ) : (
            <Waiting namePlayer={student.current.fullName} text="Waiting " />
          )}
        </section>
        <div className="flex-score-game">
          <ScoreBoard
            xPlaying={xPlaying.current}
            studentsPlay={studentsPlay}
            scores={scores}
          />
          <section className={`SectionG  ${pauseGame ? "pauseGame" : ""}`}>
            <Game
              xPlaying={xPlaying.current}
              setPauseGame={setPauseGame}
              setVisible={setVisible}
              pointGame={Room.point || 2}
              turn={turn}
              setTurn={setTurn}
              over={over}
              // questionHistory={questionHistory}
              scores={scores}
              roundOver={roundOver}
              flagGame={flagGame}
            />
          </section>
        </div>
        <></>
      </div>
      <div className={`div-wait ${stateRoom ? "start-Playing" : ""} `}>
        <Waiting
          namePlayer={student.current.fullName}
          Message={waitState.message}
          State={waitState.state}
          token={token}
        />
      </div>
      <NotificationContainer />
    </>
  );
}

export default App;
