import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import CloseButtonBlack from "../Svgs/CloseButtonBlack";

import "./Host.css";

function Host() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("remove-existing-games");
  }, []);

  useEffect(() => {
    function getQuizzesEvent(quizzes) {
      setQuizzes(quizzes);
    }

    socket.emit("initialize-quizzes");
    socket.on("get-all-quizzes", getQuizzesEvent);

    return () => socket.off("get-all-quizzes", getQuizzesEvent);
  }, [deleteQuiz]);

  const navigateToHostLobby = quizId => navigate(`/host/lobby/${quizId}`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function deleteQuiz(id) {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      socket.emit("delete-quiz", id)
    }
  }
  
  return (
    <div id="host" className="container-top">
      <h1>Start a Game</h1>
      <p>
        Choose a Game Below or{" "}
        <Link id="create-game-link" to="/create-quiz">
          Create your Own!
        </Link>
      </p>
      <div id="saved-quizzes">
        {quizzes.map((quiz) => {
          return (
            <div className="quiz" key={quiz._id}>
              <h1 onClick={() => navigateToHostLobby(quiz._id)}>{quiz.quizName}</h1>
              <div onClick={() => deleteQuiz(quiz._id)} className="svg-container">
                <CloseButtonBlack/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Host;
