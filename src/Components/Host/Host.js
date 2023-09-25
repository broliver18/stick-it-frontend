import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import CloseButtonBlack from "../Svgs/CloseButtonBlack";

import "./Host.css";

function Host() {
  const [quizzes, setQuizzes] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("remove-existing-games");
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/profile/quizzes", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((error) => console.log(error))
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, [trigger]);

  const navigateToHostLobby = (quizId) => navigate(`/host/lobby/${quizId}`);

  function deleteQuiz(id) {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      fetch("http://localhost:4000/profile/quiz", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId: id }),
      }).catch((error) => console.log(error));
    }
    setTrigger((prevState) => prevState + 1);
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
              <h1 onClick={() => navigateToHostLobby(quiz._id)}>
                {quiz.quizName}
              </h1>
              <div
                onClick={() => deleteQuiz(quiz._id)}
                className="svg-container"
              >
                <CloseButtonBlack />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Host;
