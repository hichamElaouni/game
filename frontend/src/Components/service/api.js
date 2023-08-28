import axios, { Axios } from "axios";

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

const getAllQUestions = async (
  limit = 100,
  page = 1,
  idSubject = 0,
  idLevel = 0
) =>
  await axios.get(
    `http://${fullUrl}/db/questions?limit=${limit}&page=${page}&idSubject=${idSubject}&idLevel=${idLevel}`
  );

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

const getUserByEmail = async (email) => {
  try {
    return await axios.post(`http://${fullUrl}/db/userByEmail`, email);
  } catch (error) {
    return error?.response || error.message;
  }
  // await axios.post(`http://${fullUrl}/db/userByEmail`, data);
};

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
/**Users */
const getUserById = async (id) =>
  await axios.get(`http://${fullUrl}/db/user/${id}`);

const getAllUsers = async (limit, page) =>
  await axios.get(`http://${fullUrl}/db/users?limit=${limit}&page=${page}`);

const addUser = async (data) => {

  try {
    return await axios.post(`http://${fullUrl}/db/user`, data);
  } catch (error) {
    return error?.response || error.message;
  }
};

const deleteUser = async (id) =>
  await axios.delete(`http://${fullUrl}/db/user/${id}`);

const updateUser = async (id, userData) =>
  await axios.put(`http://${fullUrl}/db/user`, { id, userData });

/***Users */

/***   History ********/
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

const getRoomsHistory = async (idUser, limit, page) =>
  await axios.post(`http://${fullUrl}/db/roomsHistory`, {
    idUser,
    limit,
    page,
  });

const getAllHistoryQuestions = async (idRoomHistory, idUser) =>
  await axios.post(`http://${fullUrl}/db/questionsHistory`, {
    idRoomHistory,
    idUser,
  });

const login = async (email, password) => {
  await axios.post(`http://${fullUrl}/login`, {
    email,
    password,
  });
};

const getCountRooms = async (TopRooms) =>
  await axios.post(`http://${fullUrl}/db/countrooms`, { TopRooms });

const getLevels = async () => await axios.get(`http://${fullUrl}/db/levels`);

const addLevel = async (levelNumber) => {
  await axios.post(`http://${fullUrl}/db/level`, { levelNumber });
}

const updateLevel = async () => await axios.put(`http://${fullUrl}/db/level`);

const deleteLevel = async (id) => {

  await axios.delete(`http://${fullUrl}/db/level/${id}`);
}

const getSubjects = async () =>
  await axios.get(`http://${fullUrl}/db/subjects`);

const addSubject = async (name) => {
  await axios.post(`http://${fullUrl}/db/subject`, { name });
};


const updateSubject = async (id, name) =>
  await axios.put(`http://${fullUrl}/db/subject`, { id, name });

const deleteSubject = async (id) =>
  await axios.delete(`http://${fullUrl}/db/subject/${id}`);


const getLogin = async (credentials) => {
  if (credentials.username === undefined && credentials.password === undefined) return;
  try {
    const { status, data } = await axios.post(`http://${fullUrl}/login`, credentials)
    return { status, data };
  } catch (error) {
    return error.response.status
  }
}

export {
  getLogin,
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
  getStudentByEmail,

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

  /**Users */
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  login,
  /**Users */
  addRoomHistory,
  addQuestionHistory,
  updateRoomHistory,
  getRoomsHistory,
  getAllHistoryQuestions,
  /**Dashboard */
  getCountRooms,
  getSubjects,
  addSubject,
  deleteSubject,
  updateSubject,
  getLevels,
  addLevel,
  deleteLevel,
  updateLevel,
};
