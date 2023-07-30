import React, { useState, useEffect } from "react";

import "./Card.css";

function Card({ points, isQuestionAnswered, isCorrect, updateScore }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [savedTimeoutId, setSavedTimeoutId] = useState(0);

  useEffect(() => {
    return () => clearTimeout(savedTimeoutId);
  }, [savedTimeoutId]);

  function flipCard() {
    if (!isQuestionAnswered || !isCorrect) return;
    setIsFlipped(true);
    setSavedTimeoutId((prev) => {
      if (prev !== 0) clearTimeout(prev);
      return setTimeout(() => {
        setIsFlipped(false);
      }, 2000);
    });
  }

  return (
    <div
      onClick={flipCard}
      onTransitionEnd={() => {
        if (!isFlipped) updateScore(points);
      }}
      className="flip-card"
    >
      <div
        className={isFlipped ? "flip-card-inner flipped" : "flip-card-inner"}
      >
        <div className="flip-card-front">
          <h4>Flip Me!</h4>
        </div>
        <div className="flip-card-back">
          <h4>{points}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
