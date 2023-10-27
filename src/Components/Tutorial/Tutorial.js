import React, { useState } from "react";

import tutorialLogo from "../../images/tutorialLogo.png";
import createQuizGif from "../../images/createQuizGif.gif";
import joinGameGif from "../../images/joinGameGif.gif";
import playGameGif from "../../images/playGameGif.gif";

import "./Tutorial.css";

function Tutorial({ closeTutorial }) {
  const [tutorialNum, setTutorialNum] = useState(1);

  function next() {
    if (tutorialNum > 4) closeTutorial();
    setTutorialNum((prevState) => prevState + 1);
  }

  function prev() {
    if (tutorialNum < 2) return;
    setTutorialNum((prevState) => prevState - 1);
  }

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
            <h1>Origins</h1>
            <h2 className="no-mobile">Why is it called Stick It anyway?</h2>
            <h3>
              Originally, this game was played on a white board with sticky notes.
              Each sticky note had a random number behind it so no one could see .
              When someone answered a question correctly, they would be allowed to go to
              the board and select one sticky note to flip over. The number behind the sticky note was the amount of 
              points the player would be awarded. This would continue while someone
              kept track of everybody's points. The player with the most points would win!
            </h3>
            <h3>
              While fun, this game took a lot of time and organization to play. Not only would someone
              have to set up all the sticky notes, but they would also have to keep track of everyone's points.
              To make things easier, this digital version was created. It is just as fun, but without all the hassle!
            </h3>
          </>
        );
      case 3:
        return (
          <>
            <h1>Create a game!</h1>
            <h2>Choose between multiple choice or short answer questions</h2>
            <h3 className="large-margin">
              Decide on a name, as well as the point range you
              wish to have. This is important! The point range includes the{" "}
              <strong>minimum</strong> and <strong>maximum</strong> points a player can get after answering a
              question correctly. And yes, you can make the minimum
              points be negative! Answers will not be case-sensitive.
            </h3>
            <div className="gif-container">
              <img src={createQuizGif} alt="Create quiz gif no-mobile" />
            </div>
          </>
        );
      case 4:
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
      case 5:
        return (
          <>
            <h1>Play a game!</h1>
            <h2>Answer correctly and get to flip a card.</h2>
            <h3>
              The cards could be any value ranging from the{" "}
              <strong>minimum points</strong> to the{" "}
              <strong>maximum points</strong> the host selected for the game.
              The value behind the card is how many points you'll get so choose
              wisely! The values are re-generated after every question so it's impossible to cheat. Play
              at your own pace. The host's screen will show everyone's rankings.
            </h3>
            <div className="gif-container">
              <img src={playGameGif} alt="Play game gif" />
            </div>
          </>
        );
    }
  }

  return (
    <div id="tutorial" className="container-top">
      <div className="instructions-container">
        {renderAction()}
        <h4 id="numbering">{tutorialNum}/5</h4>
        <button onClick={closeTutorial} id="skip">
          Skip Tutorial
        </button>
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
