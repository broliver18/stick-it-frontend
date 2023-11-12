import React from "react";
import { Outlet } from "react-router-dom";

import Logo from "../Svgs/Logo";

import "./Root.css";

function Root() {
  return (
    <>
      <div className="logo">
        <div className="logo-container">
          <Logo />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Root;
