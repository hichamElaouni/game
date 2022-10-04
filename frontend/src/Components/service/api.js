import axios from "axios";

const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT, REACT_APP_IMAGE_URL } =
  process.env || {};

const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

// const socket = () => io.connect(fullUrl);

const getGameById = async (id) =>
  await axios.get(`http://${fullUrl}/db/Game/${id}`);

const getAllGames = async () => await axios.get(`http://${fullUrl}/db/Games`);

const addGame = async (data) => {
  await axios.post(`http://${fullUrl}/db/game`, data);
};

const deleteGame = async (id) => {
  await axios.delete(`http://${fullUrl}/db/game/${id}`);
};

const updateGame = async (id, questionData) => {
  await axios.put(`http://${fullUrl}/db/game`, { id, questionData });
};

const getQuestionById = async (id) =>
  await axios.get(`http://${fullUrl}/db/question/${id}`);

const getAllQUestions = async (limit = 100, page = 1) =>
  await axios.get(`http://${fullUrl}/db/questions?limit=${limit}&page=${page}`);

const addQuestion = async (data) => {
  await axios.post(`http://${fullUrl}/db/question`, data);
};

const deleteQuestion = async (id) => {
  await axios.delete(`http://${fullUrl}/db/question/${id}`);
};

const updateQuestion = async (id, questionData) => {
  await axios.put(`http://${fullUrl}/db/question`, { id, questionData });
};

/**Rooms */
const getRoomById = async (id) =>
  await axios.get(`http://${fullUrl}/db/room/${id}`);

const getRoomByToken = async (token) =>
  await axios.get(`http://${fullUrl}/db/room?token=${token}`);

const getAllRooms = async (limit = 100, page = 1) =>
  await axios.get(`http://${fullUrl}/db/rooms?limit=${limit}&page=${page}`);

const addRoom = async (data) => {
  await axios.post(`http://${fullUrl}/db/room`, data);
};

const deleteRoom = async (id) =>
  await axios.delete(`http://${fullUrl}/db/room/${id}`);

const updateRoom = async (id, token) =>
  await axios.put(`http://${fullUrl}/db/room`, { id, token });

// const getAllRoomsGames = async (idroom) => {
//   await axios.get(`http://${fullUrl}/db/roomgames?idroom=${idroom}`);
// };

const addQuestionsRoom = async (data) =>
  await axios.post(`http://${fullUrl}/db/addQuestionsRoom`, data);

const getQuestionByRoom = async (data) =>
  await axios.post(`http://${fullUrl}/db/questionByRoom`, data);

/**Rooms */

const getStudentByEmail = async (email, password) => {
  try {
    return await axios.post(`http://${fullUrl}/db/studentByEmail`, {
      email,
      password,
    });
  } catch (error) {
    return error?.response || error.message;
  }
  // await axios.post(`http://${fullUrl}/db/studentByEmail`, data);
};

/**Students */
const getStudentById = async (id) =>
  await axios.get(`http://${fullUrl}/db/student/${id}`);

const getAllStudents = async () =>
  await axios.get(`http://${fullUrl}/db/students`);

const addStudent = async (data) => {
  await axios.post(`http://${fullUrl}/db/student`, data);
};

const deleteStudent = async (id) =>
  await axios.delete(`http://${fullUrl}/db/student/${id}`);

const updateStudent = async (id, studentData) =>
  await axios.put(`http://${fullUrl}/db/student`, { id, studentData });

/***Students */

const addRoomHistory = async (data) => {
  return await axios.post(`http://${fullUrl}/db/roomHistory`, data);
};
const addQuestionHistory = async (data) =>
  await axios.post(`http://${fullUrl}/db/questionHistory`, data);

const updateRoomHistory = async (idHistoryRoom, roomHistory) =>
  await axios.put(`http://${fullUrl}/db/roomHistory`, {
    idHistoryRoom,
    roomHistory,
  });

export {
  /**Questions */
  getAllQUestions,
  getQuestionById,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  /**Questions */

  // getAllRoomsGames,
  /**Games */
  getGameById,
  getAllGames,
  addGame,
  deleteGame,
  updateGame,
  /**Games */

  /**Rooms */
  getAllRooms,
  getRoomById,
  addRoom,
  deleteRoom,
  updateRoom,
  getRoomByToken,
  addQuestionsRoom,
  /**Rooms */
  getQuestionByRoom,

  /**Students */
  getAllStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentByEmail,
  /**Students */
  addRoomHistory,
  addQuestionHistory,
  updateRoomHistory,
};
