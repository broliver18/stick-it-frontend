import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import "./HostGame.css";

function HostGame() {
    const [question, setQuestion] = useState('');

    const [searchParams] = useSearchParams();
    const hostId = searchParams.get("id");

    useEffect(() => {
        const gameQuestionsEvent = (question) => setQuestion(question);

        socket.emit("host-join-game", hostId);
        socket.on("game-questions", gameQuestionsEvent);

        return () => socket.off("game-questions", gameQuestionsEvent);
    }, []);

    return (
        <div id="host-game" className="component-container-top">
            <h1>{question}</h1>
        </div>
    )
}

export default HostGame;