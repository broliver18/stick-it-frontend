import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Tutorial.css";

function Tutorial() {
  return (
    <div id="tutorial" className="container-top">
      <div className="instructions-container">
        <h3 id="numbering">1/9</h3>
        <div className="nav-buttons">
          <button id="prev">Previous</button>
          <button id="next">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
