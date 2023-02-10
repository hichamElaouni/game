import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import "./Components/SideBar/SideBar.css";

import Games from "./Components/Games";
import Dashboard from "./Components/admin/pages/Dashboard";
import ListUsers from "./Components/admin/pages/User/ListUsers";
import Messages from "./Components/admin/pages/Messages/Messages";
import Questions from "./Components/admin/questions/Questions";
import Rooms from "./Components/admin/pages/Room/ListRooms";
import Setting from "./Components/admin/pages/Setting";
import Join from "./Components/Join/Join";

import SignIn from "./Components/Auth/Signin";

import ProtectedRoute from "./ProtectedRoute";

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Login from "./Components/admin/pages/Auth/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/game"
          element={

            <Games />

          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListUsers"
          element={
            <ProtectedRoute>
              <ListUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Questions"
          element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JoinRoom"
          element={
            <Join />
          }
        />

        <Route exact path="/login" element={<Login />} />


        <Route path="/RoomNotAvailable" element={<>Room Not Available</>} />
        <Route path="/ErorrSingIn" element={<>Erorr SingIn</>} />
        <Route path="/OccupiedRoom" element={<>Occupied Room</>} />
        <Route path="*" element={<> not found</>} />
      </Routes>
      <NotificationContainer />
    </Router>
  );
};

export default App;
