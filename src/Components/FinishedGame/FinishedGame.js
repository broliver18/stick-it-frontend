import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./FinishedGame.css";

function FinishedGame() {
  const [finalScore, setFinalScore] = useState();
  const [trigger, setTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const getFinalScoreEvent = (score) => setFinalScore(score);

    socket.emit("get-final-score", playerId);
    socket.on("player-final-score", getFinalScoreEvent);

    return () => socket.off("player-final-score", getFinalScoreEvent);
  }, [playerId]);

  useEffect(() => {
    if (!trigger) return;
    
    socket.emit("end-game-player")
    navigate("/");
  }, [navigate, trigger]);

  useEffect(() => {
    function hostDisconnectEvent() {
      navigate("/");
      alert("The host has ended the game");
    }

    socket.on("host-disconnect", hostDisconnectEvent);

    return () => socket.off("host-disconnect", hostDisconnectEvent);
  });

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  return (
    <div id="finished-game" className="component-container-middle">
      <div id="score-message" className="center">
        <h1>Congrats on Finishing the Game!</h1>
        <p>Don't leave this page until everyone finishes to see your ranking</p>
        <div id="final-score" className="center">
          <h2>Final Score:</h2>
          <h1>{finalScore}</h1>
        </div>
        <button onClick={incrementTrigger}>Home Page</button>
      </div>
    </div>
  );
}

export default FinishedGame;
