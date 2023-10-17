import React, { useState } from "react";
import { Link } from "react-router-dom";

import tutorialLogo from "../../images/tutorialLogo.png";

import "./Tutorial.css";

function Tutorial() {
  const [tutorialNum, setTutorialNum] = useState(1);

  const next = () => setTutorialNum((prevState) => prevState + 1);
  const prev = () => setTutorialNum((prevState) => prevState - 1);

  function renderAction() {
    // eslint-disable-next-line default-case
    switch (tutorialNum) {
      case 1:
        return (
          <>
            <h1>Welcome to Stick It!</h1>
            <h2>
              This short tutorial will walk you through how to create and play a
              game.
            </h2>
            <h3>
              If you want to dive right in, you can hit the "skip tutorial"
              button and start playing. Otherwise press "next"!
            </h3>
            <div className="tutorial-img-container">
              <img src={tutorialLogo} alt="tutorial logo" />
            </div>
          </>
        );
      case 2: 
        return (
          <>
            
          </>
        )
    }
  }

  return (
    <div id="tutorial" className="container-top">
      <div className="instructions-container">
        {renderAction()}
        <h4 id="numbering">{tutorialNum}/9</h4>
        <button id="skip">Skip Tutorial</button>
        <div className="nav-buttons">
          <button onClick={prev} id="prev">
            Previous
          </button>
          <button onClick={next} id="next">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
