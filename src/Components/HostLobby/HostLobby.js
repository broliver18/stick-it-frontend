import React, { useState, useEffect } from "react";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import socket from "../../socket";

import "./HostLobby.css";

function HostLobby() {
  const [gamePin, setGamePin] = useState();
  const [playersInGame, setPlayersInGame] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("host-join", quizId);
    socket.on("show-game-pin", (gamePin) => setGamePin(gamePin));
    socket.emit("host-end-game");

    return () => socket.off("show-game-pin", (gamePin) => setGamePin(gamePin));
  }, [quizId]);

  useEffect(() => {
    function getPlayersEvent(players) {
      setPlayersInGame(players);
    }

    socket.on("update-player-lobby", getPlayersEvent);

    return () => socket.off("update-player-lobby", getPlayersEvent);
  });

  useEffect(() => {
    if (!trigger) return;

    function gameStartedEvent(id) {
      const searchQueryParams = { id };
      const searchQueryString = createSearchParams(searchQueryParams);
      navigate({
        pathname: "/host/game",
        search: `?${searchQueryString}`,
      });
    }

    socket.emit("start-game");
    socket.on("game-started", gameStartedEvent);

    return () => socket.off("game-started", gameStartedEvent);
  }, [navigate, trigger]);

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  return (
    <>
      {gamePin && (
        <div id="host-lobby" className="container-top">
          <h2>Join the Game Using the Game Pin:</h2>
          <h1>{gamePin}</h1>
          <div id="players-list" className="container-top">
            {playersInGame.map((player) => (
              <p className="player-name" key={player.playerId}>
                {player.name}
              </p>
            ))}
          </div>
          <button onClick={incrementTrigger} className="button">
            Start Game
          </button>
        </div>
      )}
    </>
  );
}

export default HostLobby;
