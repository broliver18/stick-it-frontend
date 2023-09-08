import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./Home.css";

function Home() {
  const [trigger, setTrigger] = useState(0);
  const [input, setInput] = useState({
    displayName: "",
    pin: "",
  });
  const { displayName, pin } = input;
  const nameInputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!trigger) return;

    function noNameEvent() {
      alert("Please enter a name");
      setInput((prevState) => ({
        ...prevState,
        displayName: "",
      }));
    }

    function nameAlreadyExistsEvent() {
      alert("Another player is already using this name");
      setInput((prevState) => ({
        ...prevState,
        displayName: "",
      }));
    }

    function playerJoinEvent(gameFound) {
      if (gameFound) {
        navigate("/player/lobby");
        setInput((prevState) => ({
          ...prevState,
          displayName: "",
          pin: "",
        }));
      } else {
        setInput((prevState) => ({
          ...prevState,
          pin: "",
        }));
        alert("No game found with this pin.");
      }
    }

    socket.emit("player-join", displayName, pin);
    socket.on("game-found-status", playerJoinEvent);
    socket.on("no-name", noNameEvent);
    socket.on("name-already-exists", nameAlreadyExistsEvent);

    return () => {
      socket.off("game-found-status", playerJoinEvent);
      socket.off("no-name", noNameEvent);
      socket.off("name-already-exists", nameAlreadyExistsEvent);
    };
  }, [trigger]);

  useEffect(() => {
    socket.emit("player-disconnect");
  }, []);

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div id="home" className="container-middle">
      <h1>Join a Game</h1>
      <div className="game-input-info">
        <label>Display Name</label>
        <input
          name="displayName"
          value={displayName}
          onChange={handleChange}
          ref={nameInputRef}
        />
        <label>Game Pin</label>
        <input name="pin" value={pin} onChange={handleChange} />
        <button onClick={incrementTrigger}>Join</button>
        <Link className="link" to="/host-login">
          Click here to host a game
        </Link>
      </div>
    </div>
  );
}

export default Home;
