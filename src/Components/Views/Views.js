import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ResetLink from "../ResetLink/ResetLink";
import ResetPassword from "../ResetPassword/ResetPassword";
import PlayerLobby from "../PlayerLobby/PlayerLobby";
import PlayerGame from "../PlayerGame/PlayerGame";
import FinishedGame from "../FinishedGame/FinishedGame";
import Host from "../Host/Host";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import HostLobby from "../HostLobby/HostLobby";
import HostGame from "../HostGame/HostGame";
import { AccountContext } from "../Contexts/AccountContext";
import { GameContext } from "../Contexts/PlayerContext";

function Views() {
  const { user } = useContext(AccountContext);
  const { isPlaying } = useContext(GameContext);
  const loggedIn = user.loggedIn;
  
  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Navigate to="/host" /> : <Home />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/host" /> : <Login />} />
      <Route path="/sign-up" element={loggedIn ? <Navigate to="/host" /> : <SignUp />} />
      <Route path="/reset-password/link" element={<ResetLink />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/player/lobby" element={!isPlaying ? <Navigate to="/" /> : <PlayerLobby />} />
      <Route path="/player/game" element={!isPlaying ? <Navigate to="/" /> : <PlayerGame />} />
      <Route path="/player/finished-game" element={!isPlaying ? <Navigate to="/" /> : <FinishedGame />} />
      <Route path="/host" element={!loggedIn ? <Navigate to="/" /> : <Host />} />
      <Route path="/create-quiz" element={!loggedIn ? <Navigate to="/" /> : <CreateQuiz />} />
      <Route path="/host/lobby/:quizId" element={!loggedIn ? <Navigate to="/" /> : <HostLobby />} />
      <Route path="/host/game" element={!loggedIn ? <Navigate to="/" /> : <HostGame />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default Views;
