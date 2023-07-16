import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./CreateGame.css";

import QuestionForm from "../QuestionForm/QuestionForm";

function CreateGame() {
  const [trigger, setTrigger] = useState(0);
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
    if (questions.find((questionInfo) => !questionInfo.question)) {
      console.log("it worked");
    }
  }, [questions]);

  const { quizName, minPoints, maxPoints } = input;

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  const saveQuestionInfo = (input) =>
    setQuestions((prevState) => [...prevState, input]);

  function addQuestion() {
    setQuestionsArray((prevState) => [
      ...prevState,
      { value: true, id: nanoid() },
    ]);
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
            trigger={trigger}
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
