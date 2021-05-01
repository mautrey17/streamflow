import React from "react";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavTabs() {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();

  return (
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}
        >
          DashBoard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/project" className={location.pathname === "/project" ? "nav-link active" : "nav-link"}>
          Project
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/messaging"
          className={location.pathname === "/messaging" ? "nav-link active" : "nav-link"}
        >
          Messaging
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/notes"
          className={location.pathname === "/notes" ? "nav-link active" : "nav-link"}
        >
          Notes
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/userprofile"
          className={location.pathname === "/userprofile" ? "nav-link active" : "nav-link"}
        >
          User Profile
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
