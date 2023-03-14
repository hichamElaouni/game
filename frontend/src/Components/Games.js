//multi rander ;multi insert ;update room hisroty; type var
import React, { useState, useEffect, useRef } from "react";
import {
  getQuestionByRoom,
  addRoomHistory,
  addQuestionHistory,
  updateRoomHistory,
  updateUser,
} from "./service/api";
import Question from "./Question/Question";
import TicTacToe from "./TicTacToe/TicTacToe";
import Waiting from "./waiting/Waiting";
import { ScoreBoard } from "./Score/ScoreBoard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { socket } from "./service/socket";
import {
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const { REACT_APP_BACKEND_URL, REACT_APP_FORNTEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_FORNTEND_PORT}`;

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

  const usersPlay = useRef([{}, {}]);

  const [idHistoryRoom, setIdHistoryRoom] = useState(0);

  const [timerWating, setTimerWating] = useState(10);
  useEffect(() => {
    if (timerWating > 0) {
      console.log("🚀 ~ file: Games.js:48 ~ App ~ timerWating:", timerWating)

      const interval = setInterval(() => {
        setTimerWating((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

  }, [timerWating])

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  let navigate = useNavigate();
  const flagGame = useRef(true);
  let indexPlayer = 0;
  let user = useRef({});
  let Room = {};
  const xPlaying = useRef();
  const refRoom = useRef(false);

  const quitGame = () => {
    localStorage.clear();
    navigate(`/JoinRoom/?token=${token}`);
  };

  if (localStorage.getItem("dataUser") === null) {
    navigate("/JoinRoom?token=" + token);
  } else {
    const {
      indexPlayer: index,
      user: data,
      room,
    } = JSON.parse(localStorage.getItem("dataUser"));
    indexPlayer = index;
    user.current = data;
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
    if (parseInt(indexPlayer) === 1) {
      setTurn(true);
      xPlaying.current = true;
      setStateRoom(true);
      setVisible(false);
    }

    if (parseInt(indexPlayer) === 2) {
      setTurn(false);
      xPlaying.current = false;
      setStateRoom(false);

      socket.emit("setStateRoom", {
        idUser: user.current.id,
        point: user.current.point,
        victories: user.current.victories,
        first_name: user.current.first_name,
        last_name: user.current.last_name,
      });
    }
  }, []);

  const updatePoint = async (index, point, victories, losses) => {
    let pointPlayer = usersPlay.current[index].point + point;
    let victoriesPlayer =
      usersPlay.current[index].victories + victories / Room.point;
    let lossesPlayer = usersPlay.current[index].losses + losses / Room.point;
    const userData = {
      point: pointPlayer,
      victories: victoriesPlayer,
      losses: lossesPlayer,
    };

    await updateUser(usersPlay.current[index].idUser, userData);
  };

  const roundGameOver = async (disconnectedPlayer) => {
    if (getOver.current && (disconnectedPlayer || indexPlayer * 1 === 2)) {
      let MsgOver = "aze";
      let roomHistory = {};
      if (disconnectedPlayer) {
        if (disconnectedPlayer.id == usersPlay.current[0].idUser) {
          MsgOver = "You Win with Srore = " + scores.current.oScore;
          updatePoint(
            1,
            scores.current.oScore,
            scores.current.oGameScore,
            scores.current.xGameScore
          );

          roomHistory = {
            idUser_1: usersPlay.current[0].idUser,
            idUser_2: usersPlay.current[1].idUser,
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
            idUser_1: usersPlay.current[1].idUser,
            idUser_2: usersPlay.current[0].idUser,
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
          idUser_1: usersPlay.current[0].idUser,
          idUser_2: usersPlay.current[1].idUser,
          idRoom: Room.id,
          victories: scores.current.xGameScore / Room.point,
          losses: scores.current.oGameScore / Room.point,
          roundPlay:
            (scores.current.oGameScore + scores.current.xGameScore) /
            Room.point,
        };

        MsgOver =
          "Game over, " +
          usersPlay.current[0].first_name + "  " + usersPlay.current[0].last_name +
          " 'X'  win the Game with Total Points =  " +
          scores.current.xScore +
          " Vs " +
          usersPlay.current[1].first_name + " " + usersPlay.current[1].last_name +
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
          idUser_1: usersPlay.current[1].idUser,
          idUser_2: usersPlay.current[0].idUser,
          IdRoom: Room.id,
          victories: scores.current.oGameScore / Room.point,
          losses: scores.current.xGameScore / Room.point,
          roundPlay:
            (scores.current.oGameScore + scores.current.xGameScore) /
            Room.point,
        };

        MsgOver =
          "Game over, " +
          usersPlay.current[1].first_name + "  " + usersPlay.current[1].last_name +
          " 'O' win the Game with Total Points =  " +
          scores.current.oScore +
          " Vs " +
          usersPlay.current[0].first_name + " " + usersPlay.current[0].last_name +
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
          idUser_1: usersPlay.current[0].idUser,
          idUser_2: usersPlay.current[1].idUser,
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

  console.log("🚀 ~ file: Games.js:293 ~ user", user)
  useEffect(() => {
    socket.on(
      "getStateRoom",
      async ({ idUser, point, victories, losses, first_name, last_name }) => {
        if (Room.id !== undefined) {
          if (refRoom.current) {
            usersPlay.current = [
              {
                idUser: user.current.id,
                first_name: user.current.first_name,
                last_name: user.current.last_name,
                point: user.current.point,
                victories: user.current.victories,
                losses: user.current.losses,
              },
              {
                indexPlayer,
                idUser,
                first_name,
                last_name,
                point,
                victories,
                losses,
              },
            ];


            const { data } = await addRoomHistory({
              idUser_1: user.current.id,
              idUser_2: idUser,
              idRoom: Room.id,
              victories: 0,
              losses: 0,
              roundPlay: 0,
            });

            setStateRoom(false);
            setVisible(true);
            setIdHistoryRoom(data.idHistoryRoom);

            socket.emit("setUsers", {
              idUser: user.current.id,
              first_name: user.current.first_name,
              last_name: user.current.last_name,

              point: user.current.point,
              victories: user.current.victories,
              losses: user.current.losses,
              idHistoryRoom: data.idHistoryRoom,
            });
            refRoom.current = false;
          }
        }
      }
    );

    socket.on(
      "getUsers",
      ({ idUser, first_name, last_name, point, victories, losses, idHistoryRoom }) => {
        if (refRoom.current) {
          usersPlay.current = [
            { idUser, first_name, last_name, point, victories, losses },
            {
              idUser: user.current.id,
              first_name: user.current.first_name,
              last_name: user.current.last_name,

              point: user.current.point,
              victories: user.current.victories,
              losses: user.current.losses,
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

    socket.on("disconnected", (User) => {
      if (!refRoom.current) {
        NotificationManager.info(
          "Player " + User.first_name + "  " + User.last_name + " disconnected you Win.",
          "Information",
          3000
        );
        getOver.current = true;

        roundGameOver(User);
      }
    });

    return () => {
      refRoom.current = true;
    };
  }, []);
  console.log("🚀 ~ file: Games.js:286 ~ usersPlay.current", usersPlay.current)
  return (
    <>
      <div className={`PartGames `}>
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              user={user}
              setVisible={setVisible}
              setPauseGame={setPauseGame}
              scores={scores}
              count={Room.TimeTurn * 3 || 15}
              setlastId={setlastId}
              lastId={lastId}
              indexPlayer={indexPlayer}
              questions={questions}
              idHistoryRoom={idHistoryRoom}
              addQuestionHistory={addQuestionHistory}
            />
          ) : (
            <Waiting namePlayer={user.current.first_name + " " + user.current.last_name} />
          )}
        </section>
        <div className="flex-score-game">
          <ScoreBoard
            xPlaying={xPlaying.current}
            usersPlay={usersPlay.current}
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
          namePlayer={user.current.first_name + "  " + user.current.last_name}
          Message={waitState.current.message}
          State={waitState.current.state}
          quitGame={() => {
            quitGame();
          }}
        />
        {timerWating === 0 && <h3>{fullUrl + "/JoinRoom?token=" + token}</h3>}
      </div>
    </>
  );
}

export default App;
