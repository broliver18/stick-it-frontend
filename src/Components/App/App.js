import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from '../Home/Home';
import Host from '../Host/Host';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={ <Home/> } />,
  <Route path='/host' element={ <Host/> } />
]));

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
