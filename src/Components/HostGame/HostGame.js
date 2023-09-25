import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./HostGame.css";

function HostGame() {
  const [quizTitle, setQuizTitle] = useState("");
  const [players, setPlayers] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const hostId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const getQuizTitleEvent = (title) => setQuizTitle(title);
    function noGameFoundEvent() {
      navigate("/host");
      alert("No game found.");
    }

    socket.emit("host-join-game", hostId);
    socket.on("get-quiz-title", getQuizTitleEvent);
    socket.on("no-game-found", noGameFoundEvent);

    return () => {
      socket.off("game-questions", getQuizTitleEvent);
      socket.off("no-game-found", noGameFoundEvent);
    };
  }, [hostId, navigate]);

  useEffect(() => {
    if (!trigger) return;

    socket.emit("host-end-game");
    navigate("/");
  }, [navigate, trigger]);

  useEffect(() => {
    const getPlayersRankedEvent = (sortedPlayers) => setPlayers(sortedPlayers);

    socket.on("player-rankings", getPlayersRankedEvent);

    return () => socket.off("player-rankings", getPlayersRankedEvent);
  });

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  return (
    <>
      {quizTitle && (
        <div id="host-game" className="container-top">
          <h1>{quizTitle}</h1>
          <div id="rankings">
            <div id="names-container">
              <h2>Name</h2>
              <div id="names">
                {players.map((player, index) => {
                  return (
                    <p key={index}>
                      {index + 1}: {player.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div id="scores-container">
              <h2>Score</h2>
              <div id="scores">
                {players.map((player, index) => {
                  return <p key={index}>{player.gameData.score}</p>;
                })}
              </div>
            </div>
          </div>
          <button onClick={incrementTrigger}>End Game</button>
        </div>
      )}
    </>
  );
}

export default HostGame;
