import express from "express";
import * as ctrl from "../controller/controller";

const route = express.Router();

route.get("/questions", ctrl.getAllQUestions);
route.get("/question/:id", ctrl.getQuestionById);
route.post("/question", ctrl.addQuestion);
route.put("/question", ctrl.updateQuestion);
route.delete("/question/:id", ctrl.deleteQuestion);

route.get("/games", ctrl.getAllGames);
route.get("/game/:id", ctrl.getGameById);

route.get("/users", ctrl.getAllUsers);
route.get("/user/:id", ctrl.getUserById);
route.post("/user", ctrl.addUser);
route.put("/user", ctrl.updateUser);
route.delete("/user/:id", ctrl.deleteUser);

route.get("/rooms", ctrl.getAllRooms);
route.get("/room/:id", ctrl.getRoomById);
route.get("/room", ctrl.getRoomByToken);

route.post("/room", ctrl.addRoom);
route.put("/room", ctrl.updateRoom);
route.delete("/room/:id", ctrl.deleteRoom);
route.get("/roomgames", ctrl.getRoomGame);

route.post("/questionByRoom", ctrl.getQuestionByRoom);
route.post("/userByEmail", ctrl.getUserByEmail);
route.post("/studentByEmail", ctrl.getStudentByEmail);


/****** History ***** */
route.post("/roomHistory", ctrl.addRoomHistory);
route.post("/questionHistory", ctrl.addQuestionHistory);

route.put("/roomHistory", ctrl.updateRoomHistory);
route.post("/roomsHistory", ctrl.getRoomsHistory);
route.post("/questionsHistory", ctrl.getAllHistoryQuestions);
route.post("/countRooms", ctrl.getCountRooms);

route.get("/subjects", ctrl.getSubjects);
route.post("/subject", ctrl.addSubject);
route.put("/subject", ctrl.updateSubject);
route.delete("/subject/:id", ctrl.deleteSubject);

route.get("/levels", ctrl.getLevels);
route.get("/level", ctrl.addLevel);
route.put("/level", ctrl.updateLevel);
route.delete("/level", ctrl.deleteLevel);



export default route;
