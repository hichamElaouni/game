import * as db from "../../../../models";
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
    const { limit, page } = req.query;
    const offset = getOffset(limit, page);

    const students = await db.Students.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
    });
    res.status(200).json({ success: true, data: questions });
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
    const students = req.body;
    const result = await db.Students.create(students);
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id, studentData } = req.body;

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

    const rooms = await db.Rooms.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
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
    console.log("sdfsdfsdf => ", questions);
    res.status(201).json({ success: true, rooms });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id, roomData } = req.body;

    const result = await db.Rooms.update(roomData, {
      where: { id: id },
    });
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
    const result = await db.rooms.create(questionsRoom);
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
    const { token, idRoom, last_id = 0 } = req.body;
    console.log(
      "🚀 ~ file: controller.js ~ line 339 ~ getQuestionByRoom ~ req.body",
      req.body
    );
    if (token < 0 && !token && !idRoom)
      return res
        .status(400)
        .json({ success: false, message: "Token or room id is required !!!" });
    const { Questions, QuestionsRoom, Rooms } = db;

    let additionalData = token
      ? {
          where: {
            idQuestion: { [Op.gt]: last_id },
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
        },
        { model: Questions },
      ],
      ...additionalData,
      raw: true,
    });

    res.status(200).json({ success: true, data, limit: data ? false : true });
  } catch (error) {
    console.log(error);
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
};
