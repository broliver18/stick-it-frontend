import React, { useState, useEffect } from "react";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { socket } from "../../socket";
import { nanoid } from "nanoid";

import "./PlayerGame.css";

import Card from "../Card/Card";

function PlayerGame() {
  const [questionInfo, setQuestionInfo] = useState({});
  const [quizInfo, setQuizInfo] = useState({});
  const [input, setInput] = useState({ answer: "" });
  const [cardPoints, setCardPoints] = useState(new Array(24).fill(0));
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionNum, setQuestionNum] = useState(1);
  const [score, setScore] = useState(0);
  const [trigger, setTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    function getQuizInfoEvent(info) {
      setQuizInfo(info);
      updateCardPoints(info.minPoints, info.maxPoints);
    }

    function noGameFoundEvent() {
      navigate("/");
      alert("No game found");
    }

    socket.emit("player-join-game", playerId);
    socket.on("get-quiz-info", getQuizInfoEvent);
    socket.on("no-game-found", noGameFoundEvent);

    return () => {
      socket.off("get-quiz-info", getQuizInfoEvent);
      socket.off("no-game-found", noGameFoundEvent);
    };
  }, [navigate, playerId]);

  useEffect(() => {
    if (trigger === quizInfo.numberOfQuestions) return;
    const questionEvent = (questionData) => setQuestionInfo(questionData);

    socket.emit("get-question", trigger, playerId);
    socket.on("question", questionEvent);

    return () => socket.off("question", questionEvent);
  }, [navigate, playerId, quizInfo.numberOfQuestions, trigger]);

  useEffect(() => {
    if (questionNum > quizInfo.numberOfQuestions) {
      const searchQueryParams = { id: playerId };
      const searchQueryString = createSearchParams(searchQueryParams);
      navigate({
        pathname: "/player/finished-game",
        search: `?${searchQueryString}`,
      });
    }
  }, [navigate, playerId, questionNum, quizInfo.numberOfQuestions]);

  useEffect(() => {
    socket.emit("player-score", score, playerId);
  }, [playerId, score]);

  useEffect(() => {
    function hostDisconnectEvent() {
      navigate("/");
      alert("The host has disconnected");
    }

    socket.on("host-disconnect", hostDisconnectEvent);

    return () => socket.off("host-disconnect", hostDisconnectEvent);
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function updateCardPoints(minPoints, maxPoints) {
    const newCardPoints = Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints
    );
    setCardPoints(newCardPoints);
  }

  function updateScore(points) {
    if (!isQuestionAnswered || !isCorrect) return;
    setScore((prevState) => prevState + points);
    const { minPoints, maxPoints } = quizInfo;
    setIsQuestionAnswered(false);
    updateCardPoints(minPoints, maxPoints);
    setQuestionNum((prevState) => prevState + 1);
  }

  function checkMultipleChoice(num) {
    setIsQuestionAnswered(true);
    setInput("");
    setTrigger((prevState) => prevState + 1);
    if (num === questionInfo.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsQuestionAnswered(false);
        setQuestionNum((prevState) => prevState + 1);
      }, 2000);
    }
  }

  function checkShortAnswer() {
    setIsQuestionAnswered(true);
    setInput({ answer: "" });
    setTrigger((prevState) => prevState + 1);
    if (input.answer === questionInfo.shortAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsQuestionAnswered(false);
        setQuestionNum((prevState) => prevState + 1);
      }, 2000);
    }
  }

  function renderAction() {
    if (isQuestionAnswered) {
      if (isCorrect) {
        return (
          <div id="correct-message" className="data-container">
            <h2>You answered correctly!</h2>
            <h4>Flip a card to see how many points you'll get</h4>
          </div>
        );
      } else {
        return (
          <div id="incorrect-message" className="data-container">
            <h2>Sorry, that was incorrect!</h2>
          </div>
        );
      }
    } else {
      if (questionInfo.questionType === "short-answer") {
        return (
          <div id="short-answer" className="data-container">
            <h2>{questionInfo.question}</h2>
            <input name="answer" value={input.answer} onChange={handleChange} />
            <button onClick={checkShortAnswer}>Answer Question</button>
          </div>
        );
      } else {
        const { question, answerOne, answerTwo, answerThree, answerFour } =
          questionInfo;
        return (
          <div id="multiple-choice" className="data-container">
            <h2>{question}</h2>
            <div id="multiple-choice-answers">
              <div onClick={() => checkMultipleChoice(1)} id="answer-one">
                <h4>{answerOne}</h4>
              </div>
              <div onClick={() => checkMultipleChoice(2)} id="answer-two">
                <h4>{answerTwo}</h4>
              </div>
              <div onClick={() => checkMultipleChoice(3)} id="answer-three">
                <h4>{answerThree}</h4>
              </div>
              <div onClick={() => checkMultipleChoice(4)} id="answer-four">
                <h4>{answerFour}</h4>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div id="player-game" className="component-container-top">
      <h1>{quizInfo.name}</h1>
      <div className="grid-container">
        {cardPoints.map((points) => {
          return (
            <Card
              key={nanoid()}
              points={points}
              isQuestionAnswered={isQuestionAnswered}
              isCorrect={isCorrect}
              updateScore={updateScore}
            />
          );
        })}
      </div>
      <div className="question-message-container">{renderAction()}</div>
      <div id="score" className="component-container-top">
        <h2>Total Score:</h2>
        <h1>{score}</h1>
      </div>
      <div id="question-number" className="component-container-middle">
        <h2>
          Question {questionNum}/{quizInfo.numberOfQuestions}
        </h2>
      </div>
    </div>
  );
}

export default PlayerGame;
