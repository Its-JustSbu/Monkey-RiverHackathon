import React from "react";
import "./dashboardNav.css";
import { Link } from "react-router";

function dashboardNav() {
  return (
    <>
      <header>
        <Link to="/Dashboard">
          <div className={`app-name`}>App Name</div>
        </Link>
        <div className={`button-img-container`}>
          <Link to={`/Dashboard/Profile/1`}>
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className={`img-container`}
            />
          </Link>
          <button className={`sign-out-button`}>Sign Out</button>
        </div>
      </header>
    </>
  );
}

export default dashboardNav;
