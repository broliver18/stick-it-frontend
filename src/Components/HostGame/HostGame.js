import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./HostGame.css";

function HostGame() {
  const [quizTitle, setQuizTitle] = useState("");

  const [searchParams] = useSearchParams();
  const hostId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const getQuizTitleEvent = (title) => setQuizTitle(title);
    function noGameFoundEvent() {
        navigate("/host");
        alert("No game found");
      }

    socket.emit("host-join-game", hostId);
    socket.on("get-quiz-title", getQuizTitleEvent);
    socket.on("no-game-found", noGameFoundEvent);

    return () => {
      socket.off("game-questions", getQuizTitleEvent);
      socket.off("no-game-found", noGameFoundEvent);
    };
  }, [hostId, navigate]);

  return (
    <div id="host-game" className="component-container-top">
      <h1>{quizTitle}</h1>
      <div id="rankings">
        <div id="name">
          <h2>Names</h2>
        </div>
        <div id="scores">
          <h2>Scores</h2>
        </div>
      </div>
      <button>End Game</button>
    </div>
  );
}

export default HostGame;
