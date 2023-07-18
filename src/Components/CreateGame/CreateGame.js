import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { socket } from "../../socket";
import { nanoid } from "nanoid";

import "./CreateGame.css";

import QuestionForm from "../QuestionForm/QuestionForm";

function CreateGame() {
  const [trigger, setTrigger] = useState(0);
  const [isQuizCreated, setIsQuizCreated] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([
    { value: true, id: nanoid() },
  ]);
  const [input, setInput] = useState({
    quizName: "",
    minPoints: "",
    maxPoints: "",
  });

  useEffect(() => {
    if (!trigger) return;
    if (questions.length === 0) return;

    function errorMessageEvent(errorMessage) {
      alert(errorMessage);
      setQuestions([]);
    };

    function createQuizEvent(message) {
      if (message === "success") {
        setIsQuizCreated(true);
        clearPage();
        <Navigate to="/host" />
      } else {
        errorMessageEvent(message);
      }
    };

    socket.emit("quiz-info", questions, input);
    socket.on("error-message", errorMessageEvent);
    socket.on("create-quiz", createQuizEvent);

    return () => {
      socket.off("error-message", errorMessageEvent);
      socket.off("create-quiz", createQuizEvent);
    };
  }, [questions]);

  const { quizName, minPoints, maxPoints } = input;

  const resetQuizCreated = () => setIsQuizCreated(false)

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  const saveQuestionInfo = (input) =>
    setQuestions((prevState) => [...prevState, input]);

  function addQuestion() {
    setQuestionsArray((prevState) => [
      ...prevState,
      { value: true, id: nanoid() },
    ]);
  }

  function clearPage() {
    setTrigger(0);
    setQuestions([]);
    setQuestionsArray([{ value: true, id: nanoid() }]);
    setInput({
      quizName: "",
      minPoints: "",
      maxPoints: "",
    });
  }

  function removeQuestion(id) {
    if (questionsArray.length === 1) return;
    const questionsCopy = [...questionsArray];
    const filteredQuestions = questionsCopy.filter(
      (question) => question.id !== id
    );
    setQuestionsArray(filteredQuestions);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div id="quiz-details">
        <label>Quiz Name</label>
        <input name="quizName" value={quizName} onChange={handleChange} />
        <label>Minimum Points</label>
        <input
          className="smaller"
          name="minPoints"
          value={minPoints}
          onChange={handleChange}
        />
        <label>Maximum Points</label>
        <input
          className="smaller"
          name="maxPoints"
          value={maxPoints}
          onChange={handleChange}
        />
      </div>
      <div className="container">
        {questionsArray.map((question) => (
          <QuestionForm
            key={question.id}
            id={question.id}
            removeQuestion={removeQuestion}
            saveQuestionInfo={saveQuestionInfo}
            trigger={trigger}
            isQuizCreated={isQuizCreated}
            resetQuizCreated={resetQuizCreated}
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={incrementTrigger}>Create Quiz</button>
      </div>
    </div>
  );
}

export default CreateGame;
