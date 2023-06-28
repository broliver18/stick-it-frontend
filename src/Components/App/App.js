import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  return <div></div>;
}

export default App;
