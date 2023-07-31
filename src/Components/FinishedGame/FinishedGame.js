import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./FinishedGame.css";

function FinishedGame() {
  return (
    <div id="finished-game" className="component-container-middle">
      <div id="score-message" className="center">
        <h1>Congrats on Finishing the Game!</h1>
        <p>Don't leave this page until everyone finishes to see your ranking</p>
        <div id="final-score" className="center">
          <h2>Final Score:</h2>
          <h1>125</h1>
        </div>
        <button>Home Page</button>
      </div>
    </div>
  );
}

export default FinishedGame;
