import React, { useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./PlayerLobby.css";

function PlayerLobby() {
  const navigate = useNavigate();

  useEffect(() => {
    function hostDisconnectEvent() {
      navigate("/");
      alert("The host has disconnected");
    }

    function gameStartedPlayerEvent() {
      const searchQueryParams = { id: socket.id };
      const searchQueryString = createSearchParams(searchQueryParams);
      navigate({
        pathName: "/player/game",
        search: `?${searchQueryString}`,
      })
    }

    socket.on("host-disconnect", hostDisconnectEvent);
    socket.on("game-started-player", gameStartedPlayerEvent);

    return () => {
      socket.off("host-disconnect", hostDisconnectEvent);
      socket.off("game-started-player", gameStartedPlayerEvent);
    };
  });

  const leaveLobby = () => navigate("/");

  return (
    <div id="player-lobby" className="component-container-middle">
      <h1>Waiting for Host to Start Game</h1>
      <p>Do you see your name on the host's screen?</p>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      <button onClick={leaveLobby} className="button">
        Leave
      </button>
    </div>
  );
}

export default PlayerLobby;
