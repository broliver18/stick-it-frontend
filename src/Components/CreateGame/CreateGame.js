import React, { useState } from "react";
import { nanoid } from "nanoid";

import "./CreateGame.css";

import QuestionForm from "../QuestionForm/QuestionForm";

function CreateGame() {
  const [questionsArray, setQuestionsArray] = useState([
    { value: true, id: nanoid() },
  ]);
  const [input, setInput] = useState({
    quizName: "",
    minPoints: null,
    maxPoints: null,
  });

  const addQuestion = () =>
    setQuestionsArray([...questionsArray, { value: true, id: nanoid() }]);
  const { quizName, minPoints, maxPoints, interval } = input;

  function removeQuestion(id) {
    if (questionsArray.length === 1) return;
    const questionsCopy = [...questionsArray];
    const filteredQuestions = questionsCopy.filter(
      (question) => question.id !== id
    );
    setQuestionsArray(filteredQuestions);
  }

  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div id="quiz-details">
        <label>Quiz Name</label>
        <input name="quiz-name" value={quizName} />
        <label>Minimum Points</label>
        <input className="smaller" name="min-points" value={minPoints} />
        <label>Maximum Points</label>
        <input className="smaller" name="max-points" value={maxPoints} />
      </div>
      <div className="container">
        {questionsArray.map((question) => (
          <QuestionForm
            key={question.id}
            id={question.id}
            removeQuestion={removeQuestion}
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={addQuestion}>Add Question</button>
        <button>Create Quiz</button>
      </div>
    </div>
  );
}

export default CreateGame;
