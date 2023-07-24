import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./PlayerLobby.css";

function PlayerLobby() {
  const navigate = useNavigate();

  useEffect(() => {
    function hostDisconnectEvent() {
      navigate("/");
      alert("The host has disconnected");
    };

    socket.on("host-disconnect", hostDisconnectEvent);

    return () => socket.off("host-disconnect", hostDisconnectEvent);
  })

  return (
    <div id="player-lobby" className="component-container-middle">
      <h1>Waiting for Host to Start Game</h1>
      <p>Do you see your name on the host's screen?</p>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      <button className="button">Leave</button>
    </div>
  );
}

export default PlayerLobby;
