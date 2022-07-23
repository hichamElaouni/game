import React, { useEffect, useState } from "react";
import {
  getLastZRCCoil,
  getLastZMCCoil,
  getLastZRCRegisters,
  getLastZMCRegisters,
} from "../service/api";
// import GaugeChart from "react-gauge-chart";

import CoilList from "./Lists/Coils";
import RegistersList from "./Lists/Registers";
import AppBar from "./Header/AppBar";
import Thermo from "./temperature/Temp";
import Speed from "./SpeedMeter/speed";
import io from "socket.io-client";

const { REACT_APP_BACKEND_URL = "localhost", REACT_APP_BACKEND_PORT = 3000 } =
  process.env || {};

const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const socket = io(`ws://${fullUrl}`);

const lastZRCCoil = async (setLastCoil) => {
  const {
    data: { success, data },
  } = await getLastZRCCoil();
  if (!success) console.log("error data");
  else setLastCoil(data);
};

const lastZMCCoil = async (setLastCoil) => {
  const {
    data: { success, data },
  } = await getLastZMCCoil();
  if (!success) console.log("error data");
  else setLastCoil(data);
};

const lastZRCRegisters = async (setLastCoil, setTemperature) => {
  const {
    data: { success, data },
  } = await getLastZRCRegisters();
  if (!success) console.log("error data");
  else {
    setLastCoil(data);
    setTemperature(data[0].Temperature);
  }
};

const lastZMCRegisters = async (setLastCoil, setCG) => {
  const {
    data: { success, data },
  } = await getLastZMCRegisters();
  if (!success) console.log("error data");
  else {
    setLastCoil(data);
    setCG(data[0].CG);
  }
};

const App = () => {
  const [ZRCCoil, setZRCCoil] = useState([]);
  const [ZMCtCoil, setRMCCoil] = useState([]);
  const [ZRCRegisters, setZRCRegistersCoil] = useState([]);
  const [ZMCRegisters, setZMCRegistersCoil] = useState([]);
  const [Temperature, setTemperature] = useState();
  const [CG, setCG] = useState();

  useEffect(() => {
    lastZRCCoil(setZRCCoil);
    lastZMCCoil(setRMCCoil);
    lastZRCRegisters(setZRCRegistersCoil, setTemperature);
    lastZMCRegisters(setZMCRegistersCoil);
    socket.on("ZRCCoils", () => lastZRCCoil(setZRCCoil));
    socket.on("ZMCCoils", () => lastZMCCoil(setRMCCoil));
    socket.on("ZRCRegisters", () =>
      lastZRCRegisters(setZRCRegistersCoil, setTemperature)
    );
    socket.on("ZMCRegisters", () =>
      lastZMCRegisters(setZMCRegistersCoil, setCG)
    );
  }, []);

  return (
    <div>
      <AppBar />
      <div className="container">
        <div>
          <CoilList title={"ZRC Coils"} data={ZRCCoil} />
        </div>
        <div>
          <CoilList title={"ZMC Coils"} data={ZMCtCoil} />
        </div>
        <div>
          <RegistersList title={"ZRC Registers"} data={ZRCRegisters} />
          <Thermo id="gauge-chart2" value={Temperature} title={"temperature"} />
        </div>
        <div>
          <RegistersList title={"ZMC Registers"} data={ZMCRegisters} />
          <Speed id="gauge-chart2" value={CG} title={"temperature"} />
        </div>
      </div>
    </div>
  );
};

export default App;
