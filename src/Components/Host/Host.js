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
  const { user, setUser } = useContext(AccountContext);

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
      .then((data) => {
        if (!user.loggedIn) {
          const userData = data.userData;
          setUser({ ...userData });
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", userData.username);
        }
        setQuizzes(data.quizzes);
      });
  }, [trigger]);

  const navigateToHostLobby = (quizId) => navigate(`/host/lobby/${quizId}`);
  const navigateToEditQuiz = (quizId) => navigate(`/host/edit-quiz/${quizId}`);

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

  function logout() {
    fetch("http://localhost:4000/auth/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "appication/json",
      },
    })
      .catch((error) => console.log(error))
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("username");
          setUser({ loggedIn: false, username: "" });
          navigate("/");
        }
      });
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
                  <div className="quiz-functions">
                    <h4>
                      {quiz.questions.length}{" "}
                      {quiz.questions.length === 1 ? "question" : "questions"}
                    </h4>
                    <h5 onClick={() => navigateToEditQuiz(quiz._id)}>Edit</h5>
                  </div>
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
        {user.loggedIn ? (
          <div className="header-details">
            <h3>Welcome {user.username}</h3>
            <h4 onClick={logout}>Log Out</h4>
          </div>
        ) : (
          <div className={"header-details"}>
            <h4 onClick={() => navigate("/login")}>Log In</h4>
          </div>
        )}
      </div>
      {user.loggedIn ? (
        <div className="container-top body">
          <h1>Start a Game</h1>
          <p>
            Select a Game Below or{" "}
            <Link id="create-game-link" to="/host/create-quiz">
              Create your Own!
            </Link>
          </p>
          {renderAction()}
        </div>
      ) : (
        <div className="container-middle logout-message">
          <h1>Oops... Doesn't look like you're logged in yet!</h1>
        </div>
      )}
    </div>
  );
}

export default Host;
