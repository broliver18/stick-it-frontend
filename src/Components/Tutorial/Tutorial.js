import React, { useState } from "react";
import { Link } from "react-router-dom";

import tutorialLogo from "../../images/tutorialLogo.png";
import createQuizGif from "../../images/createQuizGif.gif";
import joinGameGif from "../../images/joinGameGif.gif";

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
            <h1>Create a game!</h1>
            <h3 className="small-margin">
              To create a game, you must be a host. The host hosts the game for
              other players to join and play. Decide on a name, as well as the
              point range you wish to have. This is important! The point range
              includes the <strong>minimum points</strong> a player can get
              after answering a question correctly. Vice versa for the{" "}
              <strong>maximum points.</strong> And yes, you can make the minimum
              points be negative!
            </h3>
            <h3 className="small-margin">
              Once that is done, start adding questions! Both short-answer and
              multiple-choice questions are supported. Answers are not
              case-sensitive.
            </h3>
            <div className="gif-container-special">
              <img src={createQuizGif} alt="Create quiz gif no-mobile" />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h1>Join a game!</h1>
            <h2>
              Once a host has created a game, others can join the game to play.
            </h2>
            <h3>
              When a host starts a game, they will be taken to a lobby where a
              random PIN will be generated. Have your screen displayed so
              players can see the PIN. As a player, just enter your name and the
              PIN and click "Join"!
            </h3>
            <div className="gif-container">
              <img src={joinGameGif} alt="Join game gif" />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h1>A game of chance!</h1>
            <h2>
              Answer a question correctly and you get to flip 1 of 24 cards.
            </h2>
            <h3>
              The cards could be any value ranging from the{" "}
              <strong>minimum points</strong> to the <strong>maximum points</strong> the host selected for the
              game. The value behind the card is how many points you'll get so
              choose wisely! The values are re-generated after every question so there's no
              use in memorizing what's behind each card. You can play at your own pace while the host's screen
              shows the players' rankings.
            </h3>
          </>
        );
    }
  }

  return (
    <div id="tutorial" className="container-top">
      <div className="instructions-container">
        {renderAction()}
        <h4 id="numbering">{tutorialNum}/4</h4>
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
