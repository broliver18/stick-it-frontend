import React, { useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import "./QuestionForm.css";

function CloseButton() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Menu / Close_MD">
          {" "}
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke="#3a5a40"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

function QuestionForm() {
  const [input, setInput] = useState({
    question: "",
    shortAnswer: "",
    answerOne: "",
    answerTwo: "",
    answerThree: "",
    answerFour: "",
    correctAnswer: "",
  });
  const [questionType, setQuestionType] = useState({ value: "short-answer" });
  const {
    question,
    shortAnswer,
    answerOne,
    answerTwo,
    answerThree,
    answerFour,
    correntAnswer,
  } = input;

  const handleSelectChange = (e) => setQuestionType({ value: e.target.value });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function renderAction() {
    if (questionType.value === "multiple-choice") {
      return (
        <>
          <div className="same-row">
            <div className="column">
              <label>Answer 1</label>
              <input
                id="answer-one"
                name="answerOne"
                type="text"
                value={answerOne}
                onChange={handleInputChange}
              />
            </div>
            <div className="column">
              <label>Answer 2</label>
              <input
                id="answer-two"
                name="answerTwo"
                type="text"
                value={answerTwo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="same-row">
            <div className="column">
              <label>Answer 3</label>
              <input
                id="answer-three"
                name="answerThree"
                type="text"
                value={answerThree}
                onChange={handleInputChange}
              />
            </div>
            <div className="column">
              <label>Answer 4</label>
              <input
                id="answer-four"
                name="answerFour"
                type="text"
                value={answerFour}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <label>Correct Answer (1-4)</label>
          <input
            id="correct-answer"
            name="correctAnswer"
            type="text"
            value={correntAnswer}
            onChange={handleInputChange}
          />
        </>
      );
    } else {
      return (
        <>
          <label>Answer</label>
          <input
            id="short-answer"
            name="answerTwo"
            type="text"
            value={shortAnswer}
            onChange={handleInputChange}
          />
        </>
      );
    }
  }

  return (
    <div className="question-form">
      <div id="close-button">
        <CloseButton />
      </div>
      <form>
        <label>Question Type</label>
        <select id="question-type" onChange={handleSelectChange}>
          <option value="short-answer">Short Answer</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>
        <label>Question</label>
        <input
          id="question"
          name="question"
          value={question}
          onChange={handleInputChange}
        />
        {renderAction()}
      </form>
    </div>
  );
}

export default QuestionForm;
