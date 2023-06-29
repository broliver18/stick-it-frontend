import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from '../Home/Home';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Home/> } />

));

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
