import React, { useState, useEffect } from "react";

import CloseButton from "../Svgs/CloseButton";

import "./QuestionForm.css";

function QuestionForm({
  id,
  questionData,
  removeQuestion,
  saveQuestionInfo,
  trigger,
  isQuizCreated,
  resetQuizCreated,
}) {
  const [input, setInput] = useState({
    question: questionData.question,
    shortAnswer: questionData.shortAnswer,
    answerOne: questionData.answerOne,
    answerTwo: questionData.answerTwo,
    answerThree: questionData.answerThree,
    answerFour: questionData.answerFour,
    correctAnswer: questionData.correctAnswer,
  });
  const [questionTypeValue, setQuestionTypeValue] = useState({
    value: questionData.questionType,
  });

  useEffect(() => {
    if (!trigger) return;
    const questionType = questionTypeValue.value;
    const inputInfo = { questionType, ...input };
    saveQuestionInfo(inputInfo);
  }, [trigger]);

  useEffect(() => {
    if (!trigger) return;
    if (isQuizCreated) {
      setInput({
        question: "",
        shortAnswer: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        correctAnswer: "",
      });
      setQuestionTypeValue({ value: "short-answer" });
      resetQuizCreated();
    } else {
      return;
    }
  }, [isQuizCreated]);

  const {
    question,
    shortAnswer,
    answerOne,
    answerTwo,
    answerThree,
    answerFour,
    correctAnswer,
  } = input;

  const handleSelectChange = (e) =>
    setQuestionTypeValue({ value: e.target.value });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function renderAction() {
    if (questionTypeValue.value === "multiple-choice") {
      return (
        <div>
          <div className="same-row">
            <div className="column">
              <label htmlFor="answer-one">Answer 1</label>
              <input
                id="answer-one"
                name="answerOne"
                type="text"
                value={answerOne}
                onChange={handleInputChange}
              />
            </div>
            <div className="column">
              <label htmlFor="answer-two">Answer 2</label>
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
              <label htmlFor="answer-three">Answer 3</label>
              <input
                id="answer-three"
                name="answerThree"
                type="text"
                value={answerThree}
                onChange={handleInputChange}
              />
            </div>
            <div className="column">
              <label htmlFor="answer-four">Answer 4</label>
              <input
                id="answer-four"
                name="answerFour"
                type="text"
                value={answerFour}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="last-row column">
            <label htmlFor="correct-answer">Correct Answer (1-4)</label>
            <input
              id="correct-answer"
              name="correctAnswer"
              type="text"
              value={correctAnswer}
              onChange={handleInputChange}
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <label htmlFor="short-answer">Answer</label>
          <input
            id="short-answer"
            name="shortAnswer"
            type="text"
            value={shortAnswer}
            onChange={handleInputChange}
          />
        </>
      );
    }
  }

  return (
    <div id="question-form">
      <div id="close-button" onClick={() => removeQuestion(id)}>
        <CloseButton />
      </div>
      <form>
        <label htmlFor="question-type">Question Type</label>
        <select id="question-type" onChange={handleSelectChange}>
          <option value="short-answer">Short Answer</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          name="question"
          type="text"
          value={question}
          onChange={handleInputChange}
        />
        {renderAction()}
      </form>
    </div>
  );
}

export default QuestionForm;
