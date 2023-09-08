import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../Home/Home";
import Host from "../Host/Host";
import HostLogin from "../HostLogin/HostLogin";
import HostRegister from "../HostRegister/HostRegister";
import CreateGame from "../CreateGame/CreateGame";
import HostLobby from "../HostLobby/HostLobby";
import PlayerLobby from "../PlayerLobby/PlayerLobby";
import PlayerGame from "../PlayerGame/PlayerGame";
import HostGame from "../HostGame/HostGame";
import FinishedGame from "../FinishedGame/FinishedGame";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/host" element={<Host />} />,
    <Route path="/host-login" element={<HostLogin />} />,
    <Route path="host-register" element={<HostRegister />} />,
    <Route path="/create-game" element={<CreateGame />} />,
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
