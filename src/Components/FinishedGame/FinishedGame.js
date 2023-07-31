import React from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./FinishedGame.css";

function FinishedGame() {
  return (
    <div id="finished-game" className="component-container-middle">
      <h1>Congrats on finishing the game!</h1>
    </div>
  );
}

export default FinishedGame;
