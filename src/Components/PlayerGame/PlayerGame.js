import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";
import { nanoid } from "nanoid";

import "./PlayerGame.css";

import Card from "../Card/Card";

function PlayerGame() {
  const [questionInfo, setQuestionInfo] = useState({});
  const [quizInfo, setQuizInfo] = useState({});
  const [input, setInput] = useState({ answer: "" });
  const [cardPoints, setCardPoints] = useState(new Array(24).fill(0));
  const [score, setScore] = useState(0);
  const [trigger, setTrigger] = useState(2);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const getQuizInfoEvent = (info) => setQuizInfo(info);

    socket.emit("player-join-game", playerId);
    socket.on("get-quiz-title", getQuizInfoEvent);

    return () => socket.off("get-quiz-title", getQuizInfoEvent);
  }, []);

  useEffect(() => {
    const questionEvent = (questionData) => setQuestionInfo(questionData);

    socket.emit("get-question", trigger);
    socket.on("question", questionEvent);

    return () => socket.off("question", questionEvent);
  }, [trigger]);

  useEffect(() => {
    function noGameFoundEvent() {
      navigate("/");
      alert("No game found");
    }

    socket.on("no-game-found", noGameFoundEvent);

    return () => socket.off("no-game-found", noGameFoundEvent);
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function renderAction() {
    if (questionInfo.questionType === "short-answer") {
      return (
        <div id="short-answer" className="component-container-top">
          <h2>{questionInfo.question}</h2>
          <input name="answer" value={input.answer} onChange={handleChange} />
          <button>Answer Question</button>
        </div>
      );
    } else {
      const { question, answerOne, answerTwo, answerThree, answerFour } =
        questionInfo;
      return (
        <div id="multiple-choice" className="component-container-top">
          <h2>{question}</h2>
          <div className="multiple-choice-answers">
            <div id="answer-one">
              <h4>{answerOne}</h4>
            </div>
            <div id="answer-two">
              <h4>{answerTwo}</h4>
            </div>
            <div id="answer-three">
              <h4>{answerThree}</h4>
            </div>
            <div id="answer-four">
              <h4>{answerFour}</h4>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div id="player-game" className="component-container-top">
      <h1>{quizInfo.name}</h1>
      <div className="grid-container">
        {cardPoints.map((point) => {
          return <Card point={point} key={nanoid()} />;
        })}
      </div>
      {renderAction()}
      <div id="score" className="component-container-top">
        <h2>Total Score:</h2>
        <h1>{score}</h1>
      </div>
    </div>
  );
}

export default PlayerGame;
