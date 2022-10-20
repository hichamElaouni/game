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

//  >>>>>>>>> Start Sockits <<<<<<<<<<<<

let Token = "";
let RoomsArray = [];
let EmailsArray = {};
let studentsPlaySameRoom = "";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ token, student }) => {
    socket.join(token);
    EmailsArray[socket.id] = student;

    studentsPlaySameRoom = { roomId: token, studentId: [student.email] };

    let roomlengthMembers = io.sockets.adapter.rooms.get(token) || 0;

    if (roomlengthMembers.size > 2) {
      socket.leave(token, socket.id);
      socket.emit("RoomNotAvailable", "OccupiedRoom");
    } else {
      const roomIndex = RoomsArray.findIndex((room) => room.roomId === token);

      if (roomIndex !== -1) {
        const studentId = RoomsArray[roomIndex].studentId;

        if (!studentId.includes(student.email)) {
          //نشو دور ديالو؟؟
          studentId.push(student.email);
        } else {
          studentId.splice(studentId.indexOf(student.email), 1);

          console.log(
            "🚀 ~ file: index.js ~ line 54 ~ socket.on ~ EmailsArray[socket.id]",
            EmailsArray[socket.id],
            studentId,
            RoomsArray
          );
          // delete EmailsArray[socket.id];
          // socket.leave(token, socket.id);
          // socket.emit("RoomNotAvailable", "ErorrSingIn");

          return;
        }
      } else {
        RoomsArray.push(studentsPlaySameRoom);
      }

      socket.emit("Startplaying", roomlengthMembers.size, student);
      Token = token;
    }
  });

  socket.on("setPlayer", (player) => {
    socket.to(Token).emit("getPlayer", player);
  });

  socket.on("setxScore", (xScore, xGameScore) => {
    socket.to(Token).emit("getxScore", xScore, xGameScore);
  });

  socket.on("setoScore", (oScore, oGameScore) => {
    socket.to(Token).emit("getoScore", oScore, oGameScore);
  });

  socket.on("switch_turn", ({ turn, updatedBoard }) => {
    socket.to(Token).emit("switch", { turn, updatedBoard });
  });

  socket.on("setwin", (winMessage) => {
    socket.to(Token).emit("getwin", winMessage);
  });

  socket.on("setStateRoom", ({ indexPlayer, idStudent, fullName }) => {
    socket.to(Token).emit("getStateRoom", { indexPlayer, idStudent, fullName });
  });

  socket.on(
    "setStudents",
    ({ idStudent, fullName, point, victories, losses, idHistoryRoom }) => {
      socket.to(Token).emit("getStudents", {
        idStudent,
        fullName,
        point,
        victories,
        losses,
        idHistoryRoom,
      });
    }
  );

  socket.on("setGameOver", (MsgOver) => {
    io.to(Token).emit("getGameOver", MsgOver);
  });

  socket.on("setResetGame", () => {
    socket.to(Token).emit("getResetGame");
  });

  socket.on("disconnect", () => {
    try {
      const roomIndex = RoomsArray.findIndex((Token) => room.roomId === Token);

      const room = RoomsArray[roomIndex]?.studentId;

      room.splice(room.indexOf(EmailsArray[socket.id].email), 1);
      socket.to(Token).emit("disconnected", EmailsArray[socket.id]);

      delete EmailsArray[socket.id];
      socket.leave(Token);
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 120 ~ socket.on ~ error", error);
    }
  });
});
//  >>>>>>>>> ENG Sockits <<<<<<<<<<<<

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
