import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/* Home page that displays login and signup button links */

function Home({ currentUser }) {
  let username;
  if (currentUser) {
    username = currentUser.username;
  }

  return (
    <div>
      <br />
      {username ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <h5>Search for companies and open positions using the bar above.</h5>
        </div>
      ) : (
        <div className="home">
          <h1>Welcome</h1>
          <h5>Log in or sign up to start your job search!</h5>

          <Link to={`/Login`}>
            <Button className="btn btn-md btn-primary m-3">Login</Button>
          </Link>
          <Link to={`/Signup`}>
            <Button className="btn btn-md btn-primary m-3">Sign up</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
