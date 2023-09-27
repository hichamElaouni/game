import React, { useState, useMemo, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import "./Components/SideBar/SideBar.css";

import Games from "./Components/Games";
import Dashboard from "./Components/admin/Dashboard/Dashboard";
import ListUsers from "./Components/admin/User/ListUsers";
import Messages from "./Components/admin/Messages/Messages";
import Questions from "./Components/admin/questions/Questions";
import Rooms from "./Components/admin/Room/ListRooms";
import Setting from "./Components/admin/Setting";
import Join from "./Components/Join/Join";
import Subjects from "./Components/Subjects/ListSubjects";
import SetingsCusm from "./Components/Setings/SetingsCusm";

import ProtectedRoute from "./ProtectedRoute";

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Login from "./Components/admin/Auth/Login";

import ResponsiveAppBar from "./Components/NavBar/NavBar";
import profileImage from "./Components/Image/Admin.png";

import { hasLoggedOut, hasLoggedIn, getUser } from "./Components/service/auth";
import Profile from "./Components/admin/User/Profile";

const App = () => {
  const [connectionState, setConnectionState] = useState(hasLoggedIn());
  const { user } = getUser() || {};

  const pages = [
    "Home",
    "Top Rooms",
    "Products",
    "Pricing",
    "About",
    "Contact",
  ];
  const [profiles, setProfiles] = useState(
    connectionState
      ? [user.first_name + " " + user.last_name, "Logout"]
      : ["Profile", "Login"]
  );

  const refHome = useRef(null);
  const refTopRoom = useRef(null);
  const refProducts = useRef(null);
  const refPrices = useRef(null);
  const refAbout = useRef(null);
  const refContact = useRef(null);

  const refs = [
    refHome,
    refTopRoom,
    refProducts,
    refPrices,
    refAbout,
    refContact,
  ];

  const scrollDown = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setProfiles(
      connectionState
        ? [user.first_name + " " + user.last_name, "Logout"]
        : ["Profile", "Login"]
    );
  }, [connectionState]);

  return (
    <Router>
      {useMemo(() => {
        return (
          <ResponsiveAppBar
            pages={pages}
            refs={refs}
            scrollDown={scrollDown}
            profiles={profiles}
            profileImage={profileImage}
            state={connectionState}
            hasLoggedOut={hasLoggedOut}
            Messages={5}
            Notifications={7}
          />
        );
      }, [profiles])}

      <Routes>
        <Route
          exact
          path="/login"
          element={<Login setConnectionState={setConnectionState} />}
        />

        <Route path="/game" element={<Games />} />

        <Route path="/SetingsCusm" element={<SetingsCusm />} />

        <Route
          path="/"
          element={
            connectionState ? (
              <ProtectedRoute>
                <Dashboard refs={refs} />
              </ProtectedRoute>
            ) : (
              <Dashboard refs={refs} />
            )
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListUsers"
          element={
            <ProtectedRoute>
              <ListUsers userSection={user} />
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
        <Route path="/JoinRoom" element={<Join />} />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects flag={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/levels"
          element={
            <ProtectedRoute>
              <Subjects flag={false} />
            </ProtectedRoute>
          }
        />

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
