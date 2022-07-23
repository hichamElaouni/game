import express from "express";
import * as ctrl from "../controller/controller";

const route = express.Router();

route.get("/questions", ctrl.getAllQUestions);
route.get("/question/:id", ctrl.getQuestionById);
route.post("/question", ctrl.addQuestion);
route.put("/question", ctrl.updateQuestion);
route.delete("/question/:id", ctrl.deleteQuestion);

route.get("/questionsGame", ctrl.getQuestionsGame);

route.get("/games", ctrl.getAllGames);
route.get("/game/:id", ctrl.getGameById);

route.get("/students", ctrl.getAllStudents);
route.get("/student/:id", ctrl.getStudentById);
route.post("/student", ctrl.addStudent);
route.put("/student", ctrl.updateStudent);
route.delete("/student/:id", ctrl.deleteStudent);

route.get("/rooms", ctrl.getAllRooms);
route.get("/room/:id", ctrl.getRoomById);
route.post("/room", ctrl.addRoom);
route.put("/room", ctrl.updateRoom);
route.delete("/room/:id", ctrl.deleteRoom);
route.get("/roomGames", ctrl.getRoomGame);

export default route;
