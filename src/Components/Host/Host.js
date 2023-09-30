import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import { AccountContext } from "../Contexts/AccountContext";
import TrashCan from "../Svgs/TrashCan";

import "./Host.css";

function Host() {
  const [quizzes, setQuizzes] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const navigate = useNavigate();
  const { user } = useContext(AccountContext)

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

  function renderAction() {
    if (quizzes.length >= 1) {
      return (
        <div id="saved-quizzes">
          {quizzes.map((quiz) => {
            return (
              <div className="quiz" key={quiz._id}>
                <div
                  onClick={() => deleteQuiz(quiz._id)}
                  className="svg-container"
                >
                  <TrashCan />
                </div>
                <div className="quiz-details">
                  <h1>{quiz.quizName}</h1>
                  <h4>
                    {quiz.questions.length}{" "}
                    {quiz.questions.length === 1 ? "question" : "questions"}
                  </h4>
                </div>
                <button onClick={() => navigateToHostLobby(quiz._id)}>
                  Play
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div id="no-quizzes-message" className="container-middle">
          <h1>No Quizzes Yet!</h1>
        </div>
      );
    }
  }

  return (
    <div id="host">
      <div className="header">
        <div className="header-details">
          <h3>Welcome {user.username}</h3>
          <h4>Logout</h4>
        </div>
      </div>
      <div className="container-top body">
        <h1>Start a Game</h1>
        <p>
          Select a Game Below or{" "}
          <Link id="create-game-link" to="/create-quiz">
            Create your Own!
          </Link>
        </p>
        {renderAction()}
      </div>
    </div>
  );
}

export default Host;
