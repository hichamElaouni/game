import * as db from "../../../../models";
import bcrypt from "bcrypt";
const { Op, LOCK, json } = require("sequelize");
/**
 *
 * @param {number} limit
 * @param {number} page
 * @returns number
 */

const getOffset = (limit, page) => {
  if (!limit || !page) return 0;
  return limit ? (page - 1) * limit : page || undefined;
};

const getAllQUestions = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const offset = getOffset(limit, page);
    const questions = await db.Questions.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
    });
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await db.Questions.findOne({
      where: {
        id: { [Op.gt]: id },
      },
      raw: true,
    });

    res
      .status(200)
      .json({ success: true, data: question, limit: question ? false : true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await db.Games.findAll();
    res.status(200).json({ success: true, data: games });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = Object(
      await db.Games.findOne({
        where: {
          id: id,
        },
      })
    );
    res.status(200).json({ success: true, data: game });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const addQuestion = async (req, res) => {
  try {
    const questions = req.body;
    const result = await db.Questions.create(questions);

    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id, questionData } = req.body;

    const result = await db.Questions.update(questionData, {
      where: { id: id },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Questions.destroy({
      where: { id: id },
    });
    res.status(204).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



const getAllStudents = async (req, res) => {
  try {
    const { limit = 10, page } = req.query;

    const lengthTable = await db.Students.count();
    const offset = getOffset(limit, page);

    const students = await db.Students.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
    });
    res.status(200).json({ success: true, data: students, lengthTable: lengthTable });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = Object(
      await db.Students.findOne({
        where: {
          id: id,
        },
      })
    );
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const addStudent = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const data = Object(
      await db.Students.findOne({
        where: {
          email: rest.email,
        },
      })
    );
    if (!data.email) {
      // const { password, ...restData } = rest;
      // const hashedPassword = await bcrypt.hash(rest.password, 10);
      // const student = { ...restData, password: hashedPassword };
      const result = await db.Students.create(rest);

      res.status(201).json({ success: true, result });
    } else {
      res
        .status(203)
        .json({ success: false, data: [], message: "Email already exists" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id, studentData } = req.body;
    console.log(
      "🚀 ~ file: controller.js ~ line 175 ~ updateStudent ~  id, studentData",
      req.body
    );
    const result = await db.Students.update(studentData, {
      where: { id: id },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Students.destroy({
      where: { id: id },
    });
    res.status(204).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const offset = getOffset(limit, page);

    db.Rooms.belongsTo(db.Games, {
      foreignKey: "idGame",
      sourceKey: "id",
    });

    const rooms = await db.Rooms.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,

      include: [
        {
          model: db.Games,
        },
      ],
    });
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = Object(
      await db.Rooms.findOne({
        where: {
          id: id,
        },
      })
    );
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const getRoomByToken = async (req, res) => {
  try {
    const { token } = req.query;
    const room = Object(
      await db.Rooms.findOne({
        where: {
          token: token,
        },
      })
    );
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const addRoom = async (req, res) => {
  try {
    const { rooms, questionsSelected } = req.body;
    const room = await db.Rooms.create(rooms);
    const data = questionsSelected.map((item) => {
      return {
        idRoom: room.id,
        idQuestion: item,
      };
    });
    const questions = await db.QuestionsRoom.bulkCreate(data);
    res.status(201).json({ success: true, rooms });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id, token } = req.body;

    const result = await db.Rooms.update(
      { token: token },
      {
        where: { id: id },
      }
    );
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Rooms.destroy({
      where: { id: id },
    });
    res.status(204).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getRoomGame = async (req, res) => {
  try {
    const { idroom } = req.query;
    const { Questions, Games, Rooms } = db;
    /*
      select * FROM Questions q, Rooms rm, Games gm
      where q.idGame = gm.id
      and gm.id = rm.idGame
      and rm.id = 3
    
    */
    //Games.hasMany(Questions, { foreignKey: "idGame", sourceKey: "id" });

    Questions.belongsTo(Games, { foreignKey: "idGame", sourceKey: "id" });

    Games.hasMany(Rooms, { foreignKey: "idGame", sourceKey: "id" });
    //Rooms.belongsTo(Games, { foreignKey: "idGame", sourceKey: "id" });

    const data = await Questions.findAll({
      include: [
        {
          model: Games,
          include: [
            {
              model: Rooms,
              where: { id: idroom },
            },
          ],
          required: true,
        },
      ],

      raw: true,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const addQuestionsRoom = async (req, res) => {
  try {
    const questionsRoom = req.body;
    const result = await db.Rooms.create(questionsRoom);
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateQuestionsRoom = async (req, res) => {
  try {
    const { idRoom, questionsRoomData } = req.body;

    const result = await db.Rooms.update(questionsRoomData, {
      where: { id: idRoom },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getQuestionByRoom = async (req, res) => {
  try {
    const { token, idRoom, id = 0 } = req.body;

    if (token < 0 && !token && !idRoom)
      return res
        .status(400)
        .json({ success: false, message: "Token or room id is required !!!" });
    const { Questions, QuestionsRoom, Rooms } = db;

    let additionalData = token
      ? {
        where: {
          idQuestion: { [Op.gt]: id },
        },
        limit: 1,
      }
      : {};

    QuestionsRoom.belongsTo(Questions, {
      foreignKey: "idQuestion",
      sourceKey: "id",
    });
    QuestionsRoom.hasMany(Rooms, { foreignKey: "id", sourceKey: "idRoom" });

    const data = await QuestionsRoom.findAll({
      include: [
        {
          model: Rooms,
          where: token ? { token: token } : { id: idRoom },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Questions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      ...additionalData,

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res
      .status(200)
      .json({ success: true, data, limit: data.length ? false : true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStudentByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await db.Students.findOne({
      where: { email: email },
    });
    if (data) {
      // if (await bcrypt.compare(password, data.password)) {
      if (password === data.password) {
        res.status(200).json({ success: true, data: data });
      } else {
        res
          .status(401)
          .json({ success: false, data: [], message: "Password Incorrect" });
      }
    } else {
      res
        .status(200)
        .json({ success: false, data: [], message: "Email does not exist" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addRoomHistory = async (req, res) => {
  try {
    const historyRoom = await db.RoomHistory.create(req.body);
    res.status(201).json({
      success: true,
      idHistoryRoom: historyRoom.id,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addQuestionHistory = async (req, res) => {
  try {
    const historyQuestion = await db.QuestionsHistory.create(req.body);
    res.status(201).json({
      success: true,
      historyQuestion: historyQuestion,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateRoomHistory = async (req, res) => {
  try {
    const { idHistoryRoom, roomHistory } = req.body;

    const result = await db.RoomHistory.update(roomHistory, {
      where: { id: idHistoryRoom },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getRoomsHistory = async (req, res) => {
  try {
    const { idStudent, limit = 10, page } = req.body;
    const offset = getOffset(limit, page);
    const { RoomHistory, Students, Rooms } = db;

    RoomHistory.belongsTo(Students, {
      foreignKey: "idStudent_2",
      sourceKey: "id",
    });
    RoomHistory.hasMany(Rooms, { foreignKey: "id", sourceKey: "idRoom" });

    const roomHistory = await RoomHistory.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
      include: [
        {
          model: Rooms,

        },
        {
          model: Students,
        },
      ],
      where: { idStudent_1: idStudent },
      raw: true,
      nest: true,
    });

    const lengthTable = await db.RoomHistory.count();

    res.status(200).json({ success: true, data: roomHistory, lengthTable: lengthTable });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllHistoryQuestions = async (req, res) => {
  try {
    const { idRoomHistory, idStudent } = req.body;

    const { QuestionsHistory, Questions } = db;

    QuestionsHistory.belongsTo(Questions, {
      foreignKey: "idQuestion",
      sourceKey: "id",
    });

    const questionsHistory = await QuestionsHistory.findAll({
      include: [
        {
          model: Questions,
          //attributes: ["nameRoom"],
        },
      ],
      where: { idStudent: idStudent, idRoomHistory: idRoomHistory },
    });

    res.status(200).json({ success: true, data: questionsHistory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


module.exports = {
  getAllQUestions,
  getQuestionById,

  addQuestion,
  updateQuestion,
  deleteQuestion,

  getAllStudents,
  getStudentById,

  addStudent,
  updateStudent,
  deleteStudent,

  getStudentByEmail,

  getAllRooms,
  getRoomById,
  getRoomByToken,

  addRoom,
  updateRoom,
  deleteRoom,

  getAllGames,
  getGameById,

  getRoomGame,
  addQuestionsRoom,

  getQuestionByRoom,
  /********** History ***********/
  addRoomHistory,
  addQuestionHistory,
  updateRoomHistory,
  getRoomsHistory,
  getAllHistoryQuestions,


};
