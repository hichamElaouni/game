import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";
import apiRoutes from "./modules";

import http from "http";
import passport from "passport";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { authLocal } from "./modules/services/auth";
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
let UsersPlaySameRoom = "";

io.on("connection", (socket) => {
  socket.on("joinRoom", (token, User) => {
    socket.join(token);

    EmailsArray[socket.id] = User;

    UsersPlaySameRoom = { roomId: token, UserId: [User.email] };

    let roomlengthMembers = io.sockets.adapter.rooms.get(token) || 0;

    if (roomlengthMembers.size > 2) {
      socket.leave(token, socket.id);
      socket.emit("RoomNotAvailable", "OccupiedRoom");
    } else {
      const roomIndex = RoomsArray.findIndex((room) => room.roomId === token);

      console.log("************", EmailsArray);

      if (roomIndex !== -1) {
        const UserId = RoomsArray[roomIndex].UserId;

        if (!UserId.includes(User.email)) {
          UserId.push(User.email);
        } else {
          // UserId.splice(UserId.indexOf(User.email), 1);
          delete EmailsArray[socket.id];
          socket.leave(token, socket.id);
          socket.emit("RoomNotAvailable", "ErorrSingIn");
          return;
        }
      } else {
        RoomsArray.push(UsersPlaySameRoom);
      }

      socket.emit("Startplaying", roomlengthMembers.size, User);
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

  socket.on("setStateRoom", ({ indexPlayer, idUser, first_name, last_name }) => {
    socket.to(Token).emit("getStateRoom", { indexPlayer, idUser, first_name, last_name });
  });

  socket.on(
    "setUsers",
    ({ idUser, first_name, last_name, point, coins, victories, losses, idHistoryRoom }) => {
      socket.to(Token).emit("getUsers", {
        idUser,
        first_name, last_name,
        point,
        coins,
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

      const roomIndex = RoomsArray.findIndex((room) => room.roomId === Token);

      const room = RoomsArray[roomIndex]?.UserId;

      room.splice(room.indexOf(EmailsArray[socket.id].email), 1);
      socket.to(Token).emit("disconnected", EmailsArray[socket.id]);

      delete EmailsArray[socket.id];
      socket.leave(Token);
    } catch (error) {

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

app.post("/login", authLocal, async (req, res, next) => {
  const token = await jwt.sign(req.user, JWT_SECRET);
  const { role } = jwt_decode(token) || {};

  if (role !== 1) {

    res.status(401).send({ status: 401, message: "User not authenticated" })
  } else {
    res.status(200).send(token);
  }
  return next();
});

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
