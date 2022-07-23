import axios from "axios";

const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env || {};

const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const getLastZRCCoil = async () =>
  await axios.get(`http://${fullUrl}/db/last_ZRC_coils`);
const getLastZMCCoil = async () =>
  await axios.get(`http://${fullUrl}/db/last_ZMC_coils`);
const getLastZRCRegisters = async () =>
  await axios.get(`http://${fullUrl}/db/last_ZRC_Registers`);
const getLastZMCRegisters = async () =>
  await axios.get(`http://${fullUrl}/db/last_ZMC_Registers`);

export {
  getLastZRCCoil,
  getLastZMCCoil,
  getLastZRCRegisters,
  getLastZMCRegisters,
};
