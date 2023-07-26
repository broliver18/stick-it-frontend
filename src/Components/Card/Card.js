import React, { useState } from "react";

import "./Card.css";

function Card({ point }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    setIsFlipped(true);
    setTimeout(() => {
        setIsFlipped(false);
    }, 2000);
  };

  return (
    <div onClick={flipCard} className="flip-card">
      <div
        className={isFlipped ? "flip-card-inner flipped" : "flip-card-inner"}
      >
        <div className="flip-card-front">
          <h4>Flip Me!</h4>
        </div>
        <div className="flip-card-back">
          <h4>{point}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
