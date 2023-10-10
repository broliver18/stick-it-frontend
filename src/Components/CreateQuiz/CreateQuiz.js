import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import QuestionForm from "../QuestionForm/QuestionForm";
import BackButton from "../Svgs/BackButton";

import "./CreateQuiz.css";

function CreateQuiz() {
  const [trigger, setTrigger] = useState(0);
  const [isQuizCreated, setIsQuizCreated] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([
    {
      id: nanoid(),
      value: true,
      question: {
        questionType: "short-answer",
        question: "",
        shortAnswer: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        correctAnswer: null,
      },
    },
  ]);
  const [input, setInput] = useState({
    quizName: "",
    minPoints: "",
    maxPoints: "",
  });

  const { quizName, minPoints, maxPoints } = input;
  const navigate = useNavigate();

  useEffect(() => {
    if (!trigger) return;
    if (questions.length === 0) return;

    fetch("http://localhost:4000/profile/quiz", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizDetails: input,
        questions,
      }),
    })
      .catch((error) => console.log(error))
      .then((res) => res.json())
      .then((message) => {
        if (message === "success") {
          setIsQuizCreated(true);
          navigate("/host");
        } else {
          alert(message);
          setQuestions([]);
        }
      });
  }, [questions]);

  const resetQuizCreated = () => setIsQuizCreated(false);

  const incrementTrigger = () => setTrigger((prevState) => prevState + 1);

  const saveQuestionInfo = (input) =>
    setQuestions((prevState) => [...prevState, input]);

  function addQuestion() {
    setQuestionsArray((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        value: true,
        question: {
          questionType: "short-answer",
          question: "",
          shortAnswer: "",
          answerOne: "",
          answerTwo: "",
          answerThree: "",
          answerFour: "",
          correctAnswer: null,
        },
      },
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
    <div id="create-quiz" className="container-top">
      <h1>Create Quiz</h1>
      <form id="quiz-details">
        <label htmlFor="quiz-name">Quiz Name</label>
        <input
          id="quiz-name"
          name="quizName"
          type="text"
          value={quizName}
          onChange={handleChange}
        />
        <label htmlFor="min-points">Minimum Points</label>
        <input
          id="min-points"
          className="smaller"
          name="minPoints"
          type="text"
          value={minPoints}
          onChange={handleChange}
        />
        <label htmlFor="max-points">Maximum Points</label>
        <input
          id="max-points"
          className="smaller"
          name="maxPoints"
          type="text"
          value={maxPoints}
          onChange={handleChange}
        />
      </form>
      <div className="form-container">
        {questionsArray.map((questionInfo) => (
          <QuestionForm
            key={questionInfo.id}
            id={questionInfo.id}
            questionData={questionInfo.question}
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

export default CreateQuiz;
