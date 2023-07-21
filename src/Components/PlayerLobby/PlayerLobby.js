import React from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./PlayerLobby.css";

function PlayerLobby() {
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
