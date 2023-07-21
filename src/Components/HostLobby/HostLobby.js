import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";

import "./HostLobby.css"

function HostLobby() {
    const [gamePin, setGamePin] = useState();

    let { gameId } = useParams();

    useEffect(() => {
        socket.emit("host-join", gameId);
        socket.on("show-game-pin", gamePin => setGamePin(gamePin));

        return () => socket.off("show-game-pin", gamePin => setGamePin(gamePin));
    }, []);

    function getPlayers() {
        socket.on("update-player-lobby", (playersInGame) => {
            playersInGame.map((player) => <p>{player}</p>)
        })
    }

    return (
        <div id="host-lobby" className="component-container-top">
            <h2>Join the Game Using the Game Pin:</h2>
            <h1>{gamePin}</h1>
            <div id="players-list" className="component-container-top">
                {getPlayers()}
            </div>
            <button className="button">Start Game</button>
        </div>
    )
}

export default HostLobby;