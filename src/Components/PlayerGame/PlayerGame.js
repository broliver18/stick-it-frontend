import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";
import { nanoid } from "nanoid";

import "./PlayerGame.css";

import Card from "../Card/Card";

function PlayerGame() {
  const [points, setPoints] = useState(new Array(24).fill(0));
  const [question, setQuestion] = useState();
  const [trigger, setTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    function noGameFoundEvent() {
      navigate("/");
      alert("No game found");
    }

    socket.emit("player-join-game", playerId);
    socket.on("no-game-found", noGameFoundEvent);

    return () => socket.off("no-game-found", noGameFoundEvent);
  }, []);

  useEffect(() => {
    const questionEvent = (question) => setQuestion(question);
    
    socket.emit("get-question", trigger);
    socket.on("question", questionEvent);

    return () => socket.off("question", questionEvent);
  }, []);

  function renderAction() {
    
  }

  return (
    <div id="player-game" className="component-container-top">
      <h1>Bruno's Quiz</h1>
      <div className="grid-container">
        {points.map((point) => {
          return <Card point={point} key={nanoid()}/>
        })}
      </div>
      <div id="question-section" className="component-container-top">
        <h2>How many states are in the United States?</h2>
        <input />
      </div>
    </div>
  );
}

export default PlayerGame;
