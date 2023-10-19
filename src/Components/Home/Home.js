import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../../socket";

import Tutorial from "../Tutorial/Tutorial";
import { GameContext } from "../Contexts/PlayerContext";

import "./Home.css";

function Home() {
  const [trigger, setTrigger] = useState(0);
  const [isTutorialDisplay, setIsTutorialDisplay] = useState(false);
  const [input, setInput] = useState({
    displayName: "",
    pin: "",
  });

  const { displayName, pin } = input;
  const nameInputRef = useRef();
  const navigate = useNavigate();
  const { setIsPlaying } = useContext(GameContext);

  useEffect(() => {
    let timeout;

    const tutorialVisited = sessionStorage.getItem("tutorialVisited");
    if (!tutorialVisited) {
      timeout = setTimeout(() => {
        setIsTutorialDisplay(true);
      }, 2000) 
    }

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.removeItem("finishedGame");
  }, []);

  useEffect(() => {
    localStorage.removeItem("oauth2");
  }, []);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!trigger) return;

    function noNameEvent() {
      alert("Please enter a name.");
      setInput((prevState) => ({
        ...prevState,
        displayName: "",
      }));
    }

    function nameAlreadyExistsEvent() {
      alert("Another player is already using this name.");
      setInput((prevState) => ({
        ...prevState,
        displayName: "",
      }));
    }

    function playerJoinEvent(gameFound) {
      if (gameFound) {
        setIsPlaying(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    socket.emit("player-disconnect");
  }, []);

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1)

  function closeTutorial() {
    setIsTutorialDisplay(false);
    sessionStorage.setItem("tutorialVisited", true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <>
      <div id="home" className="container-middle">
        <h1>Join a Game</h1>
        <div className="game-input-info">
          <label htmlFor="display-name">Display Name</label>
          <input
            id="display-name"
            name="displayName"
            type="text"
            value={displayName}
            onChange={handleChange}
            ref={nameInputRef}
          />
          <label htmlFor="pin">Game Pin</label>
          <input
            id="pin"
            name="pin"
            type="text"
            autoComplete="off"
            value={pin}
            onChange={handleChange}
          />
          <button onClick={incrementTrigger}>Join</button>
          <Link className="link" to="/login">
            Click here to host a game
          </Link>
        </div>
        {isTutorialDisplay && <Tutorial closeTutorial={closeTutorial}/>}
      </div>
      {!isTutorialDisplay && (
        <div className="footer">
          <h3>Contact Info</h3>
          <p>support@stickitgames.com</p>
        </div>
      )}
    </>
  );
}

export default Home;
