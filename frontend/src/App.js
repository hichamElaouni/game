import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import "./Components/SideBar/SideBar.css";

import SideBar from "./Components/SideBar/SideBar";
import Home from "./Components/Home";
import Dashboard from "./Components/admin/pages/Dashboard";

import ListStudents from "./Components/admin/pages/Student/ListStudents";
import Messages from "./Components/admin/pages/Messages/Messages";
import Questions from "./Components/admin/questions/Questions";
import Rooms from "./Components/admin/pages/Room/ListRooms";
import Setting from "./Components/admin/pages/Setting";
import Waiting from "./Components/Join/WaitingJoin";

const App = () => {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/game" element={<Home />} />
          <Route path="/JoinRoom" element={<Waiting />} />
          <Route path="/" element={<Dashboard />} />

          <Route path="/ListStudents" element={<ListStudents />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/rooms" element={<Rooms />} />
          {/* <Route path="/saved" element={<Saved />} /> */}
          <Route path="/settings" element={<Setting />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
};

export default App;
