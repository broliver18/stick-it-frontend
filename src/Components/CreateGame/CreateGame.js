import React, { useState } from "react";
import { nanoid } from "nanoid";

import "./CreateGame.css";

import QuestionForm from "../QuestionForm/QuestionForm";

function CreateGame() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([
    { value: true, id: nanoid() },
  ]);
  const [input, setInput] = useState({
    quizName: "",
    minPoints: "",
    maxPoints: "",
  })

  const addQuestion = () =>
    setQuestionsArray([...questionsArray, { value: true, id: nanoid() }]);
  
  const { quizName, minPoints, maxPoints } = input;

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

  function saveQuestionInfo(
    question,
    shortAnswer,
    answerOne,
    answerTwo,
    answerThree,
    answerFour,
    correctAnswer
  ) {
    const questionObject = {
      question,
      shortAnswer,
      answerOne,
      answerTwo,
      answerThree,
      answerFour,
      correctAnswer
    }
    setQuestions((prevState) => [ ...prevState, questionObject ])
  }

  function changeButtonState() {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 1000);
  }

  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div id="quiz-details">
        <label>Quiz Name</label>
        <input name="quiz-name" value={quizName} onChange={handleChange} />
        <label>Minimum Points</label>
        <input
          className="smaller"
          name="min-points"
          value={minPoints}
          onChange={handleChange}
        />
        <label>Maximum Points</label>
        <input
          className="smaller"
          name="max-points"
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
            isButtonClicked={isButtonClicked}
          />
        ))}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            addQuestion();
            changeButtonState();
          }}
        >
          Add Question
        </button>
        <button>Create Quiz</button>
      </div>
    </div>
  );
}

export default CreateGame;
