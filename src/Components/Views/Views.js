import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../Home/Home";
import Host from "../Host/Host";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import HostLobby from "../HostLobby/HostLobby";
import PlayerLobby from "../PlayerLobby/PlayerLobby";
import PlayerGame from "../PlayerGame/PlayerGame";
import HostGame from "../HostGame/HostGame";
import FinishedGame from "../FinishedGame/FinishedGame";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="*" element={<Home />} />,
    <Route path="/" element={<Home />} />,
    <Route path="/host" element={<Host />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/sign-up" element={<SignUp />} />,
    <Route path="/create-quiz" element={<CreateQuiz />} />,
    <Route path="/host/lobby/:gameId" element={<HostLobby />} />,
    <Route path="/player/lobby" element={<PlayerLobby />} />,
    <Route path="/player/game" element={<PlayerGame />} />,
    <Route path="/host/game" element={<HostGame />} />,
    <Route path="/player/finished-game" element={<FinishedGame />} />,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
