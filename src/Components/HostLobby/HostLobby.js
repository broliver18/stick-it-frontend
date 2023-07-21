import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";

import "./HostLobby.css";

function HostLobby() {
  const [gamePin, setGamePin] = useState();
  const [playersInGame, setPlayersInGame] = useState([]);

  let { gameId } = useParams();

  useEffect(() => {
    socket.emit("host-join", gameId);
    socket.on("show-game-pin", (gamePin) => setGamePin(gamePin));

    return () => socket.off("show-game-pin", (gamePin) => setGamePin(gamePin));
  }, []);

  useEffect(() => {
    function getPlayersEvent(players) {
        setPlayersInGame(players);
    }

    socket.on("update-player-lobby", getPlayersEvent);

    return () => socket.off("update-player-lobby", getPlayersEvent);
  });

  return (
    <div id="host-lobby" className="component-container-top">
      <h2>Join the Game Using the Game Pin:</h2>
      <h1>{gamePin}</h1>
      <div id="players-list" className="component-container-top">
        {playersInGame.map((player) => <p className="player-name" key={player.playerId}>{player.name}</p>)}
      </div>
      <button className="button">Start Game</button>
    </div>
  );
}

export default HostLobby;
