import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";
import apiRoutes from "./modules";

import http from "http";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: "*",
  },
});
let connectClient = 0;
let roomNumber = 0;

let player = "";
let id = 0;
let IDROOM = "";
let Turn = true;

// if (NumberPlayers <= 2) {
//   RoomNumbers++;
//   connectClient++;

//   if (connectClient == 1) {
//     console.log("First Client $$== ", connectClient);

//     id = 1;
//     Turn = true;
//   } else {
//     console.log("second Client $$== ", connectClient);

//     id = 2;
//     Turn = false;
//   }

//   socket.emit("connected", { namePlayer, id, Turn });
// } else {
//   socket.emit("RoomNotAvailable");
//   socket.leave(token);
// }
// });

// players[socket.id] = namePlayer;
// socket.join(token);
// RoomName = Array.from(socket.rooms)[1];
// NumberPlayers = Object.keys(players).length;
// TODO const checkRoomAvailablity = ()
//USE ID_ROOM TO CHECK IF ROOM AVIABE OR NOT
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ token }) => {
    socket.join(token);
    let roomMemeberNumber = io.sockets.adapter.rooms.get(token) || 0;

    if (roomMemeberNumber && roomMemeberNumber.size > 2) {
      console.log("🚀 roomMemeberNumber", roomMemeberNumber);
      socket.leave(token);
      socket.emit("RoomNotAvailable");
    } else {
      console.log("🚀 roomMemeberNumber == ", roomMemeberNumber.size);

      if (roomMemeberNumber.size === 1) {
        id = 1;
        Turn = true;
        // socket.on("connected_Player", (PlayerName) => {
        //   socket.emit("startGame", { id, PlayerName, Turn });
        // });
      }
      if (roomMemeberNumber.size === 2) {
        id = 2;
        Turn = false;
      }

      io.to(token).emit("playing");
      socket.on("connected_Player", (PlayerName) => {
        socket.emit("startGame", { id, PlayerName, Turn });
      });
      IDROOM = token;
    }
  });

  // socket.on("join_Room", (idroom) => {
  //   if (connectClient < 2) {
  //     IDROOM = idroom;
  //     connectClient++;
  //     if (connectClient == 1) {
  //       console.log("First Client $$== ", connectClient);
  //       player = "Hicham";
  //       id = 1;
  //       Turn = true;
  //     } else {
  //       console.log("second Client $$== ", connectClient);
  //       player = "Ayman";
  //       id = 2;
  //       Turn = false;
  //     }
  //     socket.join(IDROOM);
  //     socket.emit("connected", { player, id, Turn });
  //   } else {
  //     console.log("room it not Avaliable for now");
  //   }
  // });
  socket.on("setPlayer", (namePlayer) => {
    socket.to(IDROOM).emit("getPlayer", namePlayer);
  });

  socket.on("setScore", (scores) => {
    socket.to(IDROOM).emit("getScore", scores);
  });

  socket.on("setxScore", (xScore) => {
    socket.to(IDROOM).emit("getxScore", xScore);
  });

  socket.on("setoScore", (oScore) => {
    socket.to(IDROOM).emit("getoScore", oScore);
  });

  socket.on("switch_turn", ({ turn, updatedBoard }) => {
    socket.to(IDROOM).emit("switch", { turn, updatedBoard });
  });

  socket.on("setwin", () => {
    socket.to(IDROOM).emit("getwin");
  });

  // socket.on("setplayer", (namePlayer) => {
  //   socket.emit("getplayer", namePlayer);
  // });

  // var numClients = {};

  // socket.on("joinroom", function (room) {
  //   socket.join(room);
  //   socket.room = room;
  //   console.log(numClients[room]);
  //   if (numClients[room] == undefined) {
  //     numClients[room] = 1;
  //   } else {
  //     numClients[room]++;
  //   }
  // });

  // socket.on("disconnect", function () {
  //   numClients[socket.room]--;
  // });

  // console.log("Clients => ", numClients);

  // socket.on("send_message", (data) => {
  //   socket.to(data.roomId).emit("receive_message", data);
  //   console.log("room id == ", data.roomId);
  // });
});

dotenv.config();
moment.suppressDeprecationWarnings = true;

app.use(cors());
app.set("io", io);
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(passport.initialize());

apiRoutes(app);

const { PORT, JWT_SECRET } = process.env || 3000;

app.get("/", (req, res) => {
  console.log("Hello World");
  res.json({
    query: req.query,
    body: req.body,
    params: req.params,
  });
});

app.post("/", (req, res) => {
  console.log(JSON.stringify(req.body, null, 4));
  res.json({
    query: req.query,
    body: req.body,
    params: req.params,
  });
});

server.listen(process.env.PORT || PORT, () =>
  console.log(`The app is listning on Port ${PORT}`)
);
