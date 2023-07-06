import React, { useState } from "react";
import { nanoid } from "nanoid"

import "./CreateGame.css";

import QuestionForm from "../QuestionForm/QuestionForm";

function CreateGame() {
  const [questionsArray, setQuestionsArray] = useState([{ value: true, id: nanoid()}])

  const addQuestion = () => setQuestionsArray([...questionsArray, { value: true, id: nanoid()}])

  function removeQuestion(id) {
    if (questionsArray.length === 1) return;
    const questionsCopy = [...questionsArray];
    const filteredQuestions = questionsCopy.filter((question) => question.id !== id);
    setQuestionsArray(filteredQuestions);
  }

  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div className="container">
        {questionsArray.map((question) => (
          <QuestionForm key={question.id} id={question.id} removeQuestion={removeQuestion} />
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
