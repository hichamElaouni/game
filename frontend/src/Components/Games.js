//multi rander ;multi insert ;update room hisroty; type var
import React, { useState, useEffect, useRef } from "react";
import {
  getQuestionByRoom,
  addRoomHistory,
  addQuestionHistory,
  updateRoomHistory,
  updateStudent,
} from "./service/api";
import Question from "./Question/Question";
import TicTacToe from "./TicTacToe/TicTacToe";
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

  const getOver = useRef(false);

  const [stateRoom, setStateRoom] = useState(false);

  const waitState = useRef({
    state: false,
    message: "Wait to anothor Player to Join",
  });

  const scores = useRef({ xScore: 0, oScore: 0, xGameScore: 0, oGameScore: 0 });

  const [lastId, setlastId] = useState(0);
  const [roomQuestions, setRoomQuestions] = useState([]);

  const studentsPlay = useRef([{}, {}]);

  const [idHistoryRoom, setIdHistoryRoom] = useState(0);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  let navigate = useNavigate();
  const flagGame = useRef(true);
  let indexPlayer = 0;
  let student = useRef({});
  let Room = {};
  const xPlaying = useRef();
  const refRoom = useRef(false);

  const quitGame = () => {
    localStorage.clear();
    navigate(`/JoinRoom/?token=${token}`);
  };

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
  useEffect(() => {
    const getQuestion = async (token, id, setRoomQuestions) => {
      const {
        data: { data, success, limit },
      } = await getQuestionByRoom({ token, id });
      if (!success) console.log("error data");
      else {
        if (limit) {
          console.log("Game Over");
          getOver.current = true;
        } else {
          setRoomQuestions(data);
        }
      }
    };
    getQuestion(token, lastId, setRoomQuestions);
  }, [lastId]);

  const { Question: questions } = roomQuestions[0] || {};

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
        idStudent: student.current.id,
        point: student.current.point,
        victories: student.current.victories,
        fullName: student.current.fullName,
      });
    }
  }, []);

  const updatePoint = async (index, point, victories, losses) => {
    let pointPlayer = studentsPlay.current[index].point + point;
    let victoriesPlayer =
      studentsPlay.current[index].victories + victories / Room.point;
    let lossesPlayer = studentsPlay.current[index].losses + losses / Room.point;
    const studentData = {
      point: pointPlayer,
      victories: victoriesPlayer,
      losses: lossesPlayer,
    };

    await updateStudent(studentsPlay.current[index].idStudent, studentData);
  };

  const roundGameOver = async (disconnectedPlayer) => {
    if (getOver.current && (disconnectedPlayer || indexPlayer * 1 === 2)) {
      let MsgOver = "aze";
      let roomHistory = {};
      if (disconnectedPlayer) {
        if (disconnectedPlayer.id == studentsPlay.current[0].idStudent) {
          MsgOver = "You Win with Srore = " + scores.current.oScore;
          updatePoint(
            1,
            scores.current.oScore,
            scores.current.oGameScore,
            scores.current.xGameScore
          );

          roomHistory = {
            idStudent_1: studentsPlay.current[0].idStudent,
            idStudent_2: studentsPlay.current[1].idStudent,
            IdRoom: Room.id,
            victories: scores.current.oGameScore / Room.point,
            losses: 0,
            roundPlay: scores.current.xGameScore / Room.point,
          };
        } else {
          MsgOver = "You Win with Srore = " + scores.current.xScore;
          updatePoint(
            0,
            scores.current.oScore,
            scores.current.xGameScore,
            scores.current.oGameScore
          );

          roomHistory = {
            idStudent_1: studentsPlay.current[1].idStudent,
            idStudent_2: studentsPlay.current[0].idStudent,
            IdRoom: Room.id,
            victories: scores.current.xGameScore / Room.point,
            losses: 0,
            roundPlay: scores.current.xGameScore / Room.point,
          };
        }

        return;
      }

      if (scores.current.oScore < scores.current.xScore) {
        roomHistory = {
          idStudent_1: studentsPlay.current[0].idStudent,
          idStudent_2: studentsPlay.current[1].idStudent,
          idRoom: Room.id,
          victories: scores.current.xGameScore / Room.point,
          losses: scores.current.oGameScore / Room.point,
          roundPlay:
            (scores.current.oGameScore + scores.current.xGameScore) /
            Room.point,
        };

        MsgOver =
          "Game over, " +
          studentsPlay.current[0].fullName +
          " 'X'  win the Game with Total Points =  " +
          scores.current.xScore +
          " Vs " +
          studentsPlay.current[1].fullName +
          " 'O' Points = " +
          scores.current.oScore;

        updatePoint(
          0,
          scores.current.xScore,
          scores.current.xGameScore,
          scores.current.oGameScore
        );

        updatePoint(
          1,
          scores.current.oScore,
          scores.current.oGameScore,
          scores.current.xGameScore
        );
      } else if (scores.current.oScore > scores.current.xScore) {
        roomHistory = {
          idStudent_1: studentsPlay.current[1].idStudent,
          idStudent_2: studentsPlay.current[0].idStudent,
          IdRoom: Room.id,
          victories: scores.current.oGameScore / Room.point,
          losses: scores.current.xGameScore / Room.point,
          roundPlay:
            (scores.current.oGameScore + scores.current.xGameScore) /
            Room.point,
        };

        MsgOver =
          "Game over, " +
          studentsPlay.current[1].fullName +
          " 'O' win the Game with Total Points =  " +
          scores.current.oScore +
          " Vs " +
          studentsPlay.current[0].fullName +
          " 'X' Points =  " +
          scores.current.xScore;

        updatePoint(
          1,
          scores.current.oScore,
          scores.current.oGameScore,
          scores.current.xGameScore
        );
        updatePoint(
          0,
          scores.current.xScore,
          scores.current.xGameScore,
          scores.current.oGameScore
        );
      } else {
        roomHistory = {
          idStudent_1: studentsPlay.current[0].idStudent,
          idStudent_2: studentsPlay.current[1].idStudent,
          IdRoom: Room.id,
          victories: scores.current.oGameScore / Room.point,
          losses: scores.current.xGameScore / Room.point,
          roundPlay:
            (scores.current.oGameScore + scores.current.xGameScore) /
            Room.point,
        };

        MsgOver =
          "Game Is Over No One Wins, Score Players = " + scores.current.oScore;
        updatePoint(
          0,
          scores.current.xScore / 2,
          scores.current.xGameScore / 2,
          scores.current.oGameScore / 2
        );
        updatePoint(
          1,
          scores.current.oScore / 2,
          scores.current.oGameScore / 2,
          scores.current.xGameScore / 2
        );
      }
      setVisible(false);
      await updateRoomHistory(idHistoryRoom, roomHistory);

      socket.emit("setGameOver", MsgOver);
      //for stop call .. to avoid multi rander
      getOver.current = false;
    }
  };

  useEffect(() => {
    socket.on(
      "getStateRoom",
      async ({ idStudent, point, victories, losses, fullName }) => {
        if (Room.id !== undefined) {
          if (refRoom.current) {
            studentsPlay.current = [
              {
                idStudent: student.current.id,
                fullName: student.current.fullName,
                point: student.current.point,
                victories: student.current.victories,
                losses: student.current.losses,
              },
              {
                indexPlayer,
                idStudent,
                fullName,
                point,
                victories,
                losses,
              },
            ];

            const { data } = await addRoomHistory({
              idStudent_1: student.current.id,
              idStudent_2: idStudent,
              idRoom: Room.id,
              victories: 0,
              losses: 0,
              roundPlay: 0,
            });

            setStateRoom(false);
            setVisible(true);
            setIdHistoryRoom(data.idHistoryRoom);

            socket.emit("setStudents", {
              idStudent: student.current.id,
              fullName: student.current.fullName,
              point: student.current.point,
              victories: student.current.victories,
              losses: student.current.losses,
              idHistoryRoom: data.idHistoryRoom,
            });
            refRoom.current = false;
          }
        }
      }
    );

    socket.on(
      "getStudents",
      ({ idStudent, fullName, point, victories, losses, idHistoryRoom }) => {
        if (refRoom.current) {
          studentsPlay.current = [
            { idStudent, fullName, point, victories, losses },
            {
              idStudent: student.current.id,
              fullName: student.current.fullName,
              point: student.current.point,
              victories: student.current.victories,
              losses: student.current.losses,
            },
          ];
          setIdHistoryRoom(idHistoryRoom);
          refRoom.current = false;
        }
      }
    );

    socket.on("getGameOver", (MsgOver) => {
      setStateRoom(true);
      setVisible(false);
      setPauseGame(true);
      waitState.current = { state: true, message: MsgOver };
    });

    return () => {
      refRoom.current = true;
    };
  }, []);
  useEffect(() => {
    window.onbeforeunload = function () {
      localStorage.clear();
    };

    socket.on("disconnected", (Student) => {
      if (!refRoom.current) {
        NotificationManager.info(
          "Player " + Student.fullName + " disconnected you Win.",
          "Information",
          3000
        );
        getOver.current = true;

        roundGameOver(Student);
      }
    });

    return () => {
      refRoom.current = true;
    };
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
            <Waiting namePlayer={student.current.fullName} />
          )}
        </section>
        <div className="flex-score-game">
          <ScoreBoard
            xPlaying={xPlaying.current}
            studentsPlay={studentsPlay.current}
            scores={scores}
          />
          <section className={`SectionG  ${pauseGame ? "pauseGame" : ""}`}>
            <TicTacToe
              xPlaying={xPlaying.current}
              setPauseGame={setPauseGame}
              pauseGame={pauseGame}
              setVisible={setVisible}
              pointGame={Room.point || 2}
              turn={turn}
              setTurn={setTurn}
              getOver={getOver}
              scores={scores}
              roundGameOver={roundGameOver}
              flagGame={flagGame}
              count={Room.TimeTurn * 3 || 15}
              NotificationManager={NotificationManager}
              quitGame={() => {
                quitGame();
              }}
            />
          </section>
        </div>
        <></>
      </div>
      <div className={`div-wait ${stateRoom ? "start-Playing" : ""} `}>
        <Waiting
          namePlayer={student.current.fullName}
          Message={waitState.current.message}
          State={waitState.current.state}
          quitGame={() => {
            quitGame();
          }}
        />
      </div>
      <NotificationContainer />
    </>
  );
}

export default App;
