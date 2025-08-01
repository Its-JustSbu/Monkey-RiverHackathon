import React from "react";
import { Link } from "react-router";

function DashboardSideNav() {
  return (
    <>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Dashboard/diagnostics">Diagnostics</Link>
          </li>
          <li>
            <Link to={`/Dashboard/Profile/2`}>Profile</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DashboardSideNav;
