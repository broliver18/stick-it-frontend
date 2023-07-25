import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./PlayerGame.css";

function PlayerGame() {
    const [searchParams] = useSearchParams();
    const playerId = searchParams.get("id");

    useEffect(() => {
        socket.emit("player-join-game", playerId);
        socket.on("test", () => console.log("it worked"));

        return () => socket.off("test", () => console.log("it worked"));
    }, [])

    return (
        <div id="player-game">
            
        </div>
    )
}

export default PlayerGame;