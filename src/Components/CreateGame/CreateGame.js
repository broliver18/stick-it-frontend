import React, { useState } from "react";

import "./CreateGame.css";

import QuestionForm from '../QuestionForm/QuestionForm'

function CreateGame() {
  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div className="question-form"><QuestionForm/></div>
      <div className="buttons">
        <button>Add Question</button>
        <button>Create Quiz</button>
      </div>
    </div>
  );
}

export default CreateGame;
