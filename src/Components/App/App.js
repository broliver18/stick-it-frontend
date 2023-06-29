import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Home from '../Home/Home';

const socket = io("http://localhost:4000");
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Home/> }>

  </Route>
));

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
