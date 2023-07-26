import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket";
import { nanoid } from "nanoid";

import "./PlayerGame.css";

import Card from "../Card/Card";

function PlayerGame() {
  const [points, setPoints] = useState(new Array(24).fill(0));

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  useEffect(() => {
    socket.emit("player-join-game", playerId);
    socket.on("test", () => console.log("it worked"));

    return () => socket.off("test", () => console.log("it worked"));
  }, []);

  return (
    <div id="player-game" className="component-container-top">
      <h1>Bruno's Quiz</h1>
      <div className="grid-container">
        {points.map((point) => {
          return <Card point={point} key={nanoid()}/>
        })}
      </div>
      <div></div>
    </div>
  );
}

export default PlayerGame;
