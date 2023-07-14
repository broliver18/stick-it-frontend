import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import "./Home.css";

function Home() {
  const [input, setInput] = useState({
    displayName: "",
    pin: "",
  });
  const { displayName, pin } = input;

  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function sendInfoToServer() {
    socket.emit("display-info", displayName, pin);
    setInput((prevState) => ({
      ...prevState,
      displayName: "",
      pin: "",
    }));
  }

  return (
    <div id="home" className="component-container">
      <h1>Join a Game</h1>
      <div className="game-input-info">
        <p>Display Name</p>
        <input
          name="displayName"
          value={displayName}
          onChange={handleChange}
          ref={nameInputRef}
        />
        <p>Game Pin</p>
        <input name="pin" value={pin} onChange={handleChange} />
        <button onClick={sendInfoToServer}>Join</button>
        <Link id="host-link" to="/host">
          Click here to host a game
        </Link>
      </div>
    </div>
  );
}

export default Home;
