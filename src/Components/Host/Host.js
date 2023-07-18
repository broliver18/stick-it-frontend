import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import './Host.css';

function Host() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    function getQuizzesEvent(quizzes) {
      setQuizzes(quizzes);
    };

    socket.emit("initialize-quizzes");
    socket.on("get-all-quizzes", getQuizzesEvent);

    return () => socket.off("get-all-quizzes", getQuizzesEvent);
  }, []);
  
  return (
    <div id="host" className="component-container">
      <h1>Start a Game</h1>
      <p>
        Choose a Game Below or <Link id="create-game-link" to="/create-game">Create your Own!</Link>
      </p>
      <div id="saved-games">
        {quizzes.map(quiz => {
          return (
            <div className="quiz" key={quiz._id}>
              <h1>{quiz.quizName}</h1>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Host;
