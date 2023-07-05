import React, { useState } from "react";

import "./CreateGame.css";

import QuestionForm from '../QuestionForm/QuestionForm'

function CreateGame() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const addQuestion = () => setNumberOfQuestions((prevState) => prevState + 1);

  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div className="container">{Array(numberOfQuestions).fill(true).map((_, i) => <QuestionForm key={i} />)}</div>
      <div className="buttons">
        <button onClick={addQuestion}>Add Question</button>
        <button>Create Quiz</button>
      </div>
    </div>
  );
}

export default CreateGame;
