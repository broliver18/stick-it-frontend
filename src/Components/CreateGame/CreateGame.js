import React, { useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import "./CreateGame.css";

function CreateGame() {
  const [input, setInput] = useState({});
  const {
    question,
    multipleChoice,
    answerOne,
    answerTwo,
    answerThree,
    answerFour,
    correntAnswer,
    shortAnswer,
  } = input;

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function renderAction() {
    if (multipleChoice) {
      return (
        <>
          <label for="answer-one">Answer 1</label>
          <input
            id="answer-one"
            name="answerOne"
            type="text"
            value={answerOne}
            onChange={handleChange}
          />
          <label for="answer-two">Answer 2</label>
          <input
            id="answer-two"
            name="answerTwo"
            type="text"
            value={answerTwo}
            onChange={handleChange}
          />
          <label for="answer-three">Answer 3</label>
          <input
            id="answer-three"
            name="answerThree"
            type="text"
            value={answerThree}
            onChange={handleChange}
          />
          <label for="answer-four">Answer 4</label>
          <input
            id="answer-four"
            name="answerFour"
            type="text"
            value={answerFour}
            onChange={handleChange}
          />
          <label for="correct-answer">Correct Answer</label>
          <input
            id="correct-answer"
            name="correctAnswer"
            type="text"
            value={correntAnswer}
            onChange={handleChange}
          />
        </>
      );
    } else {
      return (
        <>
          <label for="short-answer">Answer</label>
          <input
            id="short-answer"
            name="answerTwo"
            type="text"
            value={shortAnswer}
            onChange={handleChange}
          />
        </>
      );
    }
  }

  function questionForm() {
    return (
      <form>
        <label for="question">Question</label>
        <input
          id="question"
          name="question"
          value={question}
          onChange={handleChange}
        />
        <label for="multiple-choice">Multiple Choice</label>
        <input
          id="multiple-choice"
          name="multipleChoice"
          type="radio"
          value={multipleChoice}
          onChange={handleChange}
        />
        {renderAction()}
      </form>
    );
  }

  return (
    <div id="create-game">
      <h1>Quiz Creator</h1>
      <div className="question-form">
        {questionForm()}
      </div>
    </div>
  );
}

export default CreateGame;
