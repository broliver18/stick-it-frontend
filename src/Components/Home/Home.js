import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import "./Home.css";

function Home() {
  const [nameInput, setNameInput] = useState("");
  const [pinInput, setPinInput] = useState("");

  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const handleNameChange = (e) => setNameInput(e.target.value);
  const handlePinChange = (e) => setPinInput(e.target.value);
  const sendInfo = () => socket.emit('display-info', nameInput, pinInput);

  return (
    <div id="home">
      <h1>Join a Game</h1>
      <div className="game-input-info">
        <p>Display Name</p>
        <input
          value={nameInput}
          onChange={handleNameChange}
          ref={nameInputRef}
        />
        <p>Game Pin</p>
        <input value={pinInput} onChange={handlePinChange} />
        <button onClick={sendInfo}>Join</button>
      </div>
    </div>
  );
}

export default Home;
