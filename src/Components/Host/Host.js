import React from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import './Host.css';

function Host() {
  return (
    <div id="host" className="component-container">
      <h1>Start a Game</h1>
      <p>
        Choose a Game Below or <Link id="create-game-link" to="/create-game">Create your Own!</Link>
      </p>
      <div id="saved-games"></div>
    </div>
  );
}

export default Host;
