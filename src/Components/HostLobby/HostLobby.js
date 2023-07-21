import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./HostLobby.css"

function HostLobby() {
    const [gamePin, setGamePin] = useState();

    useEffect(() => {
        socket.emit("host-join")
        socket.on("get-pin", gamePin => setGamePin(gamePin));
    }, [])

    return (
        <div id="host-lobby" className="component-container-top">
            <h2>Join the Game Using the Game Pin:</h2>
            <h1>{gamePin}</h1>
            <div id="players-list">
            </div>
            <button className="button">Start Game</button>
        </div>
    )
}

export default HostLobby;