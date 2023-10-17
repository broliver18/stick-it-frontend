import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Root from "../Root/Root";
import Home from "../Home/Home";
import Tutorial from "../Tutorial/Tutorial";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import CodeRequest from "../CodeRequest/CodeRequest";
import CodeVerify from "../CodeVerify/CodeVerify";
import ResetPassword from "../ResetPassword/ResetPassword";
import PlayerLobby from "../PlayerLobby/PlayerLobby";
import PlayerGame from "../PlayerGame/PlayerGame";
import FinishedGame from "../FinishedGame/FinishedGame";
import Host from "../Host/Host";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import EditQuiz from "../EditQuiz/EditQuiz";
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
      <Route path="/" element={<Root />}>  
        <Route path="" element={loggedIn ? <Navigate to="/host" /> : <Home />} />
        <Route path="tutorial" element={<Tutorial />} />
        <Route path="login" element={loggedIn ? <Navigate to="/host" /> : <Login />} />
        <Route path="sign-up" element={loggedIn ? <Navigate to="/host" /> : <SignUp />} />
        <Route path="reset-password/email" element={<CodeRequest />} />
        <Route path="reset-password/code/:userId" element={<CodeVerify />} />
        <Route path="reset-password/:userId" element={<ResetPassword />} />
        <Route path="player/lobby" element={!isPlaying ? <Navigate to="/" /> : <PlayerLobby />} />
        <Route path="player/game" element={!isPlaying ? <Navigate to="/" /> : <PlayerGame />} />
        <Route path="player/finished-game" element={!isPlaying ? <Navigate to="/" /> : <FinishedGame />} />
        <Route path="host" element={<Host />} />
        <Route path="host/create-quiz" element={!loggedIn ? <Navigate to="/" /> : <CreateQuiz />} />
        <Route path="host/edit-quiz/:quizId" element={!loggedIn ? <Navigate to="/" /> : <EditQuiz />} />
        <Route path="host/lobby/:quizId" element={!loggedIn ? <Navigate to="/" /> : <HostLobby />} />
        <Route path="host/game" element={!loggedIn ? <Navigate to="/" /> : <HostGame />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Views;
