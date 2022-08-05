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

const deleteRoom = async (id) => {
  await axios.delete(`http://${fullUrl}/db/room/${id}`);
};

const updateRoom = async (id, questionData) => {
  await axios.put(`http://${fullUrl}/db/room`, { id, questionData });
};

const getAllRoomsGames = async (idroom) => {
  await axios.get(`http://${fullUrl}/db/roomgames?idroom=${idroom}`);
};

/**Rooms */
export {
  /**Questions */
  getAllQUestions,
  getQuestionById,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  /**Questions */

  getAllRoomsGames,
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
  /**Rooms */
};
