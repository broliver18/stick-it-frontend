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

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/host" element={<Host />} />,
    <Route path="/create-game" element={<CreateGame />} />,
    <Route path="/host/lobby/:gameId" element={<HostLobby />} />,
    <Route path="/player/lobby" element={<PlayerLobby />} />,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
