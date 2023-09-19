import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import PlayerLobby from "../PlayerLobby/PlayerLobby";
import PlayerGame from "../PlayerGame/PlayerGame";
import FinishedGame from "../FinishedGame/FinishedGame";
import Host from "../Host/Host";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import HostLobby from "../HostLobby/HostLobby";
import HostGame from "../HostGame/HostGame";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import UserProvider from "../AccountContext/AccountContext";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/sign-up" element={<SignUp />} />,
    <Route path="/player/lobby" element={<PlayerLobby />} />,
    <Route path="/player/game" element={<PlayerGame />} />,
    <Route path="/player/finished-game" element={<FinishedGame />} />,
    <Route element={<PrivateRoutes />}>
      <Route path="/host" element={<Host />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/host/lobby/:gameId" element={<HostLobby />} />
      <Route path="/host/game" element={<HostGame />} />
    </Route>,
    <Route path="*" element={<Home />} />,
  ])
);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
