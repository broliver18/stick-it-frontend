import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./HostGame.css";

function HostGame() {
  const [question, setQuestion] = useState("");

  const [searchParams] = useSearchParams();
  const hostId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const gameQuestionsEvent = (question) => setQuestion(question);
    function noGameFoundEvent() {
        navigate("/host");
        alert("No game found");
      }

    socket.emit("host-join-game", hostId);
    socket.on("game-questions", gameQuestionsEvent);
    socket.on("no-game-found", noGameFoundEvent);

    return () => {
      socket.off("game-questions", gameQuestionsEvent);
      socket.off("no-game-found", noGameFoundEvent);
    };
  }, []);

  return (
    <div id="host-game" className="component-container-top">
      <h1>{question}</h1>
    </div>
  );
}

export default HostGame;
