import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { socket } from "../../socket";

import Home from "../Home/Home";
import Host from "../Host/Host";
import CreateGame from "../CreateGame/CreateGame";
import HostLobby from "../HostLobby/HostLobby";
import PlayerLobby from "../PlayerLobby/PlayerLobby";
import PlayerGame from "../PlayerGame/PlayerGame";
import HostGame from "../HostGame/HostGame";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/host" element={<Host />} />,
    <Route path="/create-game" element={<CreateGame />} />,
    <Route path="/host/lobby/:gameId" element={<HostLobby />} />,
    <Route path="/player/lobby" element={<PlayerLobby />} />,
    <Route path="/player/game" element={<PlayerGame />} />,
    <Route path="/host/game" element={<HostGame />} />,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
