//multi rander ;multi insert ;update room hisroty; type var
import React, { useState, useEffect, useRef, memo } from "react";
import {
  getQuestionByRoom,
  addRoomHistory,
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

const { REACT_APP_BACKEND_URL, REACT_APP_FORNTEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_FORNTEND_PORT}`;

const App = memo(() => {

  const [visible, setVisible] = useState(true);
  const [turn, setTurn] = useState(true);
  const [pauseGame, setPauseGame] = useState(true);

  const idHistoryRoom = useRef(0);

  const [timerWating, setTimerWating] = useState(30);

  const [stateRoom, setStateRoom] = useState(false);

  const [lastId, setlastId] = useState(0);
  const [roomQuestions, setRoomQuestions] = useState([]);

  const getOver = useRef(false);



  const scores = useRef({ xScore: 0, oScore: 0, xGameScore: 0, oGameScore: 0 });
  const usersPlay = useRef([{}, {}]);

  const waitState = useRef({
    state: false,
    message: "Wait for another Player to Join",
  });


  let indexPlayer = 0;
  let Room = useRef({});
  let user = useRef({});
  let navigate = useNavigate();

  const xPlaying = useRef();
  const flagGame = useRef(true);
  const refRoom = useRef(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log(timerWating);
    if (timerWating > 0 && parseInt(indexPlayer) === 1) {
      const interval = setInterval(() => {
        setTimerWating((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerWating])

  const quitGame = () => {
    localStorage.clear();
    socket.on('disconnect');
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

      xPlaying.current = true;
      setStateRoom(true);

      setVisible(false);
      setTurn(true);
    }


    if (parseInt(indexPlayer) === 2) {
      setTurn(false);
      xPlaying.current = false;
      setStateRoom(false);

      socket.emit("setStateRoom", {
        idUser: user.current.id,
        point: user.current.point,
        coins: user.current.coins,
        victories: user.current.victories,
        losses: user.current.losses,
        first_name: user.current.first_name,
        last_name: user.current.last_name,
      });
    }

  }, []);


  const updateData = async (disconnectPlayer, index, gameScoreWin, scoreWin, gameScoreLosses, scoreLosses, message) => {


    NotificationManager.info(
      "Player " + disconnectPlayer.first_name + "  " + disconnectPlayer.last_name + " disconnected you Win.",
      "Information",
      3000
    );

    let roomHistory = {};

    let point = 0;
    let coins = Room.coin;
    let victories = 0;
    let losses = 0;

    let playerWin = {};
    let playerloses = {};

    //? winner player

    victories = gameScoreWin + usersPlay.current[index].victories;
    losses = gameScoreLosses + usersPlay.current[index].losses;

    point = scoreWin + usersPlay.current[index].point;

    coins = coins + usersPlay.current[index].coins;

    playerWin = { point, coins, losses, victories };

    if (victories === null)
      await updateUser(usersPlay.current[index].idUser, playerWin);

    roomHistory = { idRoom: Room.id, idUser_1: usersPlay.current[index].idUser, idUser_2: disconnectPlayer.id, victories, losses };


    //* losser player

    victories = disconnectPlayer.victories + gameScoreLosses;
    losses = disconnectPlayer.losses + gameScoreWin;

    point = (disconnectPlayer.point - (scoreLosses - gameScoreLosses)) < 0 ? 0 : disconnectPlayer.point - (scoreLosses - gameScoreLosses);

    coins = (disconnectPlayer.coins) - (coins / 2) < 0 ? 0 : disconnectPlayer.coins - (coins / 2);

    playerloses = { point, coins, losses, victories };


    await updateUser(disconnectPlayer.id, playerloses);


    await updateRoomHistory(idHistoryRoom.current, roomHistory);


    socket.emit("setGameOver", message);

  }

  const roundGameOver = async () => {
    if (parseInt(indexPlayer) === 2) {

      //?  player 2 (O) Win
      let User = usersPlay.current[0]
      let index = 1;
      let gameScoreLosses = scores.current.xGameScore;
      let scoreLosses = scores.current.xScore;
      let gameScoreWin = scores.current.oGameScore;
      let scoreWin = scores.current.oScore;

      let message = "Game over, " +
        usersPlay.current[1].first_name + "  " + usersPlay.current[1].last_name +
        " 'O' win this Game with Total Points =  " +
        scores.current.oScore +
        " Vs Player " +
        usersPlay.current[0].first_name + " " + usersPlay.current[0].last_name +
        "with  'X' Points =  " +
        scores.current.xScore;




      if (scores.current.xScore > scores.current.oScore) {
        //x>o

        //?  Player 1 (X) Win


        index = 0;
        gameScoreLosses = scores.current.oGameScore;
        scoreLosses = scores.current.oScore;
        gameScoreWin = scores.current.xGameScore;
        scoreWin = scores.current.xScore;

        message = "Game over, Player " +
          usersPlay.current[0].first_name + "  " + usersPlay.current[0].last_name +
          " 'X'  win this Game with Total Points =  " +
          scores.current.xScore +
          " Vs Player " +
          usersPlay.current[1].first_name + " " + usersPlay.current[1].last_name +
          " 'O' Points = " +
          scores.current.oScore;

      }
      else {
        //x===o

        await updateUser(usersPlay.current[0].idUser, {
          point: usersPlay.current[0].point + scores.current.xScore / 2,
          coins: usersPlay.current[0].coins + Room.coin / 2,
          losses: usersPlay.current[0].losses + ((scores.current.oGameScore + scores.current.xGameScore) / 2),
          victories: usersPlay.current[0].victories + ((scores.current.oGameScore + scores.current.xGameScore) / 2)
        });

        await updateUser(usersPlay.current[1].idUser, {
          point: usersPlay.current[1].point + scores.current.xScore / 2,
          coins: usersPlay.current[1].coins + Room.coin / 2,
          losses: usersPlay.current[1].losses + ((scores.current.oGameScore + scores.current.xGameScore) / 2),
          victories: usersPlay.current[1].victories + ((scores.current.oGameScore + scores.current.xGameScore) / 2)
        });


        await updateRoomHistory(idHistoryRoom, {
          victories: ((scores.current.oGameScore + scores.current.xGameScore) / 2),
          losses: ((scores.current.oGameScore + scores.current.xGameScore) / 2),
          roundPlay: ((scores.current.oGameScore + scores.current.xGameScore))
        })


        socket.emit("setGameOver", "Game Is Over No One Wins, Score Players = " + scores.current.oScore);

        return;
      }

      const result = { id: User.idUser, ...User }
      updateData(result, index, gameScoreWin, scoreWin, gameScoreLosses, scoreLosses, message);

      //All cases update room & student

    }
  }


  const AddRoomHistory = async (idUser) => {


    const { data } = await addRoomHistory({
      idUser_1: user.current.id,
      idUser_2: idUser,
      idRoom: Room.id,
      victories: 0,
      losses: 0,
      roundPlay: 0,
    });

    idHistoryRoom.current = data.idHistoryRoom;
    socket.emit("setIdHestoryRoom", data.idHistoryRoom)
    return data;



  };

  socket.on("getIdHestoryRoom", (idhistoryRoom) => {
    idHistoryRoom.current = idhistoryRoom;
  });


  useEffect(() => {
    socket.on(
      "getStateRoom",
      async ({ idUser, point, coins, victories, losses, first_name, last_name }) => {

        if (Room.id !== undefined) {
          if (refRoom.current) {
            usersPlay.current = [
              {
                idUser: user.current.id,
                first_name: user.current.first_name,
                last_name: user.current.last_name,
                point: user.current.point,
                coins: user.current.coins,
                victories: user.current.victories,
                losses: user.current.losses,
              },
              {
                idUser,
                first_name,
                last_name,
                point,
                coins,
                victories,
                losses,
              },
            ];

            setStateRoom(false);
            setVisible(true);

            socket.emit("setUsers", {
              idUser: user.current.id,
              first_name: user.current.first_name,
              last_name: user.current.last_name,
              point: user.current.point,
              coins: user.current.coins,
              victories: user.current.victories,
              losses: user.current.losses,
            });
            refRoom.current = false;
          }
        }
      }
    );

    socket.on(
      "getUsers",
      ({ idUser, first_name, last_name, point, coins, victories, losses }) => {
        if (refRoom.current) {
          usersPlay.current = [
            { idUser, first_name, last_name, point, coins, victories, losses },
            {
              idUser: user.current.id,
              first_name: user.current.first_name,
              last_name: user.current.last_name,

              point: user.current.point,
              coins: user.current.coins,
              victories: user.current.victories,
              losses: user.current.losses,
            },
          ];
          refRoom.current = false;
        }
      }
    );

    socket.on("getGameOver", (MsgOver) => {
      setStateRoom(true);
      waitState.current = { state: true, message: MsgOver };
      setVisible(false);
      setPauseGame(true);
    });


    return () => {
      refRoom.current = true;
    };
  }, []);

  window.onbeforeunload = function () {
    localStorage.clear();
  };

  useEffect(() => {

    socket.on("disconnected", (User) => {

      //? player 1 (X) disconnected
      let index = 0;
      let gameScoreLosses = scores.current.xGameScore;
      let scoreLosses = scores.current.xScore;
      let gameScoreWin = scores.current.oGameScore;
      let scoreWin = scores.current.oScore;

      // xGameScore==gameScoreLosses xScore==scoreLosses oGameScore== gameScoreWin oScore == scoreWin

      if (User.id !== usersPlay.current[0].idUser) {
        //? player 2 (O) disconnected
        index = 1;
        gameScoreLosses = scores.current.oGameScore;
        scoreLosses = scores.current.oScore;
        gameScoreWin = scores.current.xGameScore;
        scoreWin = scores.current.xScore;
      }

      let message = "You win this game with score = " + scoreWin + " Player :" + User.first_name + " " + User.last_name + " Disconnected !! ";

      updateData(User, index, gameScoreWin, scoreWin, gameScoreLosses, scoreLosses, message);

    });

  }, []);


  return (
    <div style={{ display: 'flex' }}>
      <div className="PartGames">
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              user={user}
              setVisible={setVisible}
              setPauseGame={setPauseGame}
              scores={scores}
              count={Room.TimeTurn || 15}
              setlastId={setlastId}
              lastId={lastId}
              indexPlayer={indexPlayer}
              questions={questions}
              idHistoryRoom={idHistoryRoom.current}

              AddRoomHistory={AddRoomHistory}

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
              count={Room.TimeTurn / 2 || 15}
              NotificationManager={NotificationManager}
              quitGame={() => {
                quitGame();
              }}
            />
          </section>
        </div>

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
        {timerWating === 0 && <h3 style={{ cursor: "text" }}>{fullUrl + "/JoinRoom?token=" + token}</h3>}
      </div>
    </div>
  );
})

export default App;
