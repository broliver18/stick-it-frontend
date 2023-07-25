import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./PlayerGame.css";

function PlayerGame() {
  const [points, setPoints] = useState(new Array(24).fill(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  useEffect(() => {
    socket.emit("player-join-game", playerId);
    socket.on("test", () => console.log("it worked"));

    return () => socket.off("test", () => console.log("it worked"));
  }, []);

  function flipCard() {
    setIsFlipped(true);
    setTimeout(() => {
        setIsFlipped(false);
    }, 1000);
  };

  return (
    <div id="player-game" className="component-container-top">
      <h1>Bruno's Quiz</h1>
      <div class="grid-container">
        {points.map((cardPoint, index) => {
          return (
            <div onClick={flipCard} className="flip-card" key={index}>
              <div className={isFlipped ? "flip-card-inner flipped" : "flip-card-inner"}>
                <div className="flip-card-front">
                  <h4>Flip Me!</h4>
                </div>
                <div className="flip-card-back">
                  <h4>{cardPoint}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

export default PlayerGame;
