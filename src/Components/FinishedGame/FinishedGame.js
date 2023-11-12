import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import socket from "../../socket";

import "./FinishedGame.css";

function FinishedGame() {
  const [finalScore, setFinalScore] = useState();
  const [trigger, setTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const getFinalScoreEvent = (score) => setFinalScore(score);

    socket.emit("get-player-final-score", playerId);
    socket.on("player-final-score", getFinalScoreEvent);

    return () => socket.off("player-final-score", getFinalScoreEvent);
  }, [playerId]);

  useEffect(() => {
    localStorage.setItem("finishedGame", true);
  }, []);

  useEffect(() => {
    if (!trigger) return;
    
    socket.emit("player-leave-game")
    navigate("/");
  }, [navigate, trigger]);

  useEffect(() => {
    function hostDisconnectEvent() {
      navigate("/");
      alert("The host has ended the game.");
    }

    socket.on("host-disconnect", hostDisconnectEvent);

    return () => socket.off("host-disconnect", hostDisconnectEvent);
  });

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  return (
    <div id="finished-game" className="container-middle">
      <div id="score-message" className="center">
        <h1>Congrats on Finishing the Game!</h1>
        <h3>Do not go back to previous page or you'll lose your score</h3>
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
