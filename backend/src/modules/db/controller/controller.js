import * as db from "../../../../models";
import bcrypt from "bcrypt";
const { Op, } = require("sequelize");
const crypto = require('crypto');
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
    const { limit, page, idSubject, idLevel } = req.query;

    const offset = getOffset(limit, page);

    db.Questions.hasMany(db.Subjects, {
      foreignKey: "id",
      sourceKey: "idSubject",
    });
    db.Questions.hasMany(db.Levels, {
      foreignKey: "id",
      sourceKey: "idLevel",
    });


    let Filter = "";

    if (idSubject > 0 && idLevel > 0) {
      Filter = { where: { idSubject: idSubject, idLevel: idLevel } }
    } else if (idLevel > 0) {
      Filter = { where: { idLevel: idLevel } }
    } else if (idSubject > 0) {
      Filter = { where: { idSubject: idSubject } }
    }

    const questions = await db.Questions.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
      include: [
        {
          model: db.Subjects,
          attributes: ["name"]
        },
        {
          model: db.Levels,
          attributes: ["levelNumber"]
        },
      ],
      ...Filter,
    });
    const lengthTable = await db.Questions.count()

    const subjects = await db.Subjects.findAll();
    const levels = await db.Levels.findAll();

    res.status(200).json({ success: true, data: questions, subjects: subjects, levels: levels, lengthTable: lengthTable });
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



const getAllUsers = async (req, res) => {
  try {
    const { limit, page } = req.query;


    const lengthTable = await db.Users.count();
    const offset = getOffset(limit, page);

    const users = await db.Users.findAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
    });
    res.status(200).json({ success: true, data: users, lengthTable: lengthTable });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = Object(
      await db.Users.findOne({
        where: {
          id: id,
        },
      })
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const addUser = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    console.log("🚀 ~ file: controller.js:192 ~ addUser ~ rest:", rest)
    const data = Object(
      await db.Users.findOne({
        where: {
          email: rest.email,
        },
      })
    );
    if (!data.email) {
      const { password, ...restData } = rest;
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
      const user = { ...restData, password: hashedPassword };
      const result = await db.Users.create(user);

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

const updateUser = async (req, res) => {
  try {
    const { id, userData } = req.body;
    const result = await db.Users.update(userData, {
      where: { id: id },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Users.destroy({
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

    const { Questions, QuestionsRoom, Rooms, Subjects, Levels } = db;

    if (token < 0 && !token && !idRoom)
      return res
        .status(400)
        .json({ success: false, message: "Token or room id is required !!!" });

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

    db.Questions.hasMany(db.Levels, {
      foreignKey: "id",
      sourceKey: "idLevel",
    });
    db.Questions.hasMany(Subjects, {
      foreignKey: "id",
      sourceKey: "idSubject",
    });
    const lengthTable = !!idRoom ? await QuestionsRoom.count({
      where: { idroom: idRoom }
    }) : 0;


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
          include: [{
            model: Subjects,
          },
          {
            model: Levels,
          }
          ]
        }

      ],
      ...additionalData,

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });



    res
      .status(200)
      .json({ success: true, data, limit: data.length ? false : true, lengthTable: lengthTable });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//for join room>>>>>>>>>>>>>>
const getStudentByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;


    const data = await db.Users.findOne({
      where: { email: email },
    });
    if (data) {


      // const checkPassword = bcrypt.compareSync(password, data.password)

      const sha1Hash = crypto.createHash('sha1').update(password).digest('hex');
      const checkPassword = sha1Hash === data.password


      if (checkPassword) {
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
//<<<<<<<<<<<<<<<<<< join room
const getUserByEmail = async (email) => {

  try {
    let result = {};
    const dataValues = await db.Users.findOne({
      where: { email: email },
    });

    if (dataValues) {
      result = { status: 200, data: dataValues }
    }
    else {
      result = { status: 400, data: "Email does not exist" }
    }

    return result;
    // if (data) {
    //   // if (await bcrypt.compare(password, data.password)) {
    //   if (password === data.password) {
    //     res.status(200).json({ success: true, data: data });
    //   } else {
    //     res
    //       .status(401)
    //       .json({ success: false, data: [], message: "Password Incorrect" });
    //   }
    // } else {
    //   res
    //     .status(200)
    //     .json({ success: false, data: [], message: "Email does not exist" });
    // }
  } catch (error) {
    return error
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
    const { idUser, limit, page } = req.body;
    const offset = getOffset(limit, page);
    const { RoomHistory, Users, Rooms } = db;

    RoomHistory.belongsTo(Users, {
      foreignKey: "idUser_2",
      sourceKey: "id",
    });
    RoomHistory.hasMany(Rooms, { foreignKey: "id", sourceKey: "idRoom" });

    const { count, rows } = await RoomHistory.findAndCountAll({
      limit: parseInt(limit) || null,
      offset: parseInt(offset) || null,
      include: [
        {
          model: Rooms,

        },
        {
          model: Users,
        },
      ],
      where: { idUser_1: idUser },
      raw: true,
      nest: true,
    });

    // const lengthTable = await db.RoomHistory.count();

    res.status(200).json({ success: true, data: rows, lengthTable: count });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllHistoryQuestions = async (req, res) => {
  try {
    const { idRoomHistory, idUser } = req.body;

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
      where: { idUser: idUser, idRoomHistory: idRoomHistory },
    });

    res.status(200).json({ success: true, data: questionsHistory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCountRooms = async (req, res) => {


  const { TopRooms } = req.body;

  try {

    db.RoomHistory.belongsTo(db.Rooms, { foreignKey: 'idRoom' });
    db.RoomHistory.belongsTo(db.Users, { foreignKey: 'idUser_1' });
    const count = db.sequelize.fn('COUNT', db.sequelize.col('idRoom'));
    const countRoom = await db.RoomHistory.findAll({

      limit: parseInt(TopRooms),
      order: [[count, 'DESC']],

      include: [{ model: db.Rooms }],
      attributes: ['idUser_1', 'idUser_2', 'victories', 'losses', 'roundPlay', 'createdAt', 'updatedAt', [count, 'countRoom']],
      group: ['idRoom']
    })

    res.status(200).json({ success: true, data: countRoom });



  } catch (error) {
    console.log(error);
  }

}

const getSubjects = async (req, res) => {
  try {

    const subjects = await db.Subjects.findAll({

    });
    res
      .status(200)
      .json({ success: true, data: subjects });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const addSubject = async (req, res) => {
  try {


    const result = await db.Subjects.create(req.body);

    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ file: controller.js:717 ~ deleteSubject ~ id:", id)
    const result = await db.Subjects.destroy({
      where: { id: id },
    });
    res.status(204).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const updateSubject = async (req, res) => {
  try {
    const { id, subject } = req.body;

    const result = await db.Subjects.update(subject, {
      where: { id: id },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getLevels = async (req, res) => {
  try {
    const levels = await db.Levels.findAll({});
    res
      .status(200)
      .json({ success: true, data: levels });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const addLevel = async (req, res) => {
  try {
    const level = req.body;
    const result = await db.Levels.create(level);

    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const deleteLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Subjects.destroy({
      where: { id: id },
    });
    res.status(204).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const updateLevel = async (req, res) => {
  try {
    const { id, level } = req.body;

    const result = await db.Levels.update(level, {
      where: { id: id },
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {

  getCountRooms,

  getAllQUestions,
  getQuestionById,

  addQuestion,
  updateQuestion,
  deleteQuestion,

  getAllUsers,
  getUserById,

  addUser,
  updateUser,
  deleteUser,

  getUserByEmail,

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
  getStudentByEmail,

  getSubjects,
  addSubject,
  deleteSubject,
  updateSubject,

  getLevels,
  addLevel,
  deleteLevel,
  updateLevel,

};
