import React from "react";
import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    /* This is displayed when the user is not logged in  */
    <div className="error">
      <div>
        <h2 className="error-face">:(</h2>
        <h2>You Are not Logged In</h2>
      </div>
      <Link to="/">Login</Link>
    </div>
  );
}

export default NotLoggedIn;
