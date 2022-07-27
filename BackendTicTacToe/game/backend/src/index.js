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
let player = "";
let id = 0;
io.on("connection", (socket) => {
  socket.on("join_Room", (idroom) => {
    if (connectClient < 2) {
      connectClient++;
      if (connectClient == 1) {
        console.log("First Client $$== ", connectClient);
        player = "Hicham";
        id = 1;
      } else {
        console.log("second Client $$== ", connectClient);
        player = "Ayman";
        id = 2;
      }
      socket.join(idroom);
      socket.emit("receive", { player, id });

      console.log(idroom, " player == >", player);
    } else {
      console.log("room it not Avaliable for now");
    }
  });

  socket.on("setplayer", (namePlayer) => {
    socket.emit("getplayer", namePlayer);
  });

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

server.listen(PORT, () => console.log(`The app is listning on Port ${PORT}`));
