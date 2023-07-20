import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./HostLobby.css"

function HostLobby() {
    return (
        <div id="host-lobby">
            <h2>Join the Game Using the Game Pin:</h2>
            <h1>54326</h1>
            <div id="players-list">
            </div>
            <button>Start Game</button>
        </div>
    )
}

export default HostLobby;