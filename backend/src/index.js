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

let Room = "";
let indexPlayer = 0;
let rooms = [];
let Emails = {};

io.on("connection", (socket) => {
  let students = "";

  socket.on("joinRoom", ({ token, student }) => {
    socket.join(token);

    students = { roomtId: token, players: [student.email] };
    let roomMemeberNumber = io.sockets.adapter.rooms.get(token) || 0;
    Emails[socket.id] = student;
    if (roomMemeberNumber && roomMemeberNumber.size > 2) {
      socket.leave(token, socket.id);
      socket.emit("RoomNotAvailable");
    } else {
      const roomIndex = rooms.findIndex((room) => room.roomtId === token);
      if (roomIndex !== -1) {
        const room = rooms[roomIndex].players;

        if (!room.includes(student.email)) {
          room.push(student.email);
        } else {
          room.splice(room.indexOf(student.email), 1);
          delete Emails[socket.id];
          socket.leave(token, socket.id);
          socket.emit("RoomNotAvailable", { page: "doubleSingIn" });
          console.log("Not Allowed");

          return;
        }
      } else {
        rooms.push(students);
      }

      indexPlayer = roomMemeberNumber.size;
      socket.emit("Startplaying", indexPlayer, student);
      Room = token;
    }
  });

  socket.on("setPlayer", (player) => {
    socket.to(Room).emit("getPlayer", player);
  });

  socket.on("setxScore", (xScore, xGameScore) => {
    socket.to(Room).emit("getxScore", xScore, xGameScore);
  });

  socket.on("setoScore", (oScore, oGameScore) => {
    socket.to(Room).emit("getoScore", oScore, oGameScore);
  });

  socket.on("switch_turn", ({ turn, updatedBoard }) => {
    socket.to(Room).emit("switch", { turn, updatedBoard });
  });

  socket.on("setwin", (winMessage) => {
    socket.to(Room).emit("getwin", winMessage);
  });

  socket.on("setStateRoom", ({ indexPlayer, idStudent, fullName }) => {
    socket.to(Room).emit("getStateRoom", { indexPlayer, idStudent, fullName });
  });

  socket.on(
    "setStudents",
    ({ indexPlayer, idStudent, fullName, idHistoryRoom }) => {
      socket.to(Room).emit("getStudents", {
        indexPlayer,
        idStudent,
        fullName,
        idHistoryRoom,
      });
    }
  );

  socket.on("setGameOver", () => {
    socket.to(Room).emit("getGameOver");
  });

  socket.on("setOver", (MsgOver) => {
    io.to(Room).emit("getOver", MsgOver);
  });

  socket.on("setResetGame", () => {
    socket.to(Room).emit("getResetGame");
  });

  socket.on("disconnect", () => {
    try {
      const roomIndex = rooms.findIndex((room) => room.roomtId === Room);

      const room = rooms[roomIndex]?.players;

      room.splice(room.indexOf(Emails[socket.id].email), 1);
      socket.to(Room).emit("disconnected", Emails[socket.id]);
      delete Emails[socket.id];
      socket.leave(Room);
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 120 ~ socket.on ~ error", error);
    }
  });
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
