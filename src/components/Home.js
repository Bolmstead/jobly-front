import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css"
import JoblyApi from "../../Api";


/* Home page that displays login and signup button links */

function Home({ currentUser }) {
  let username;
  if (currentUser) {
    username = currentUser.username;
  }

  useEffect(() => {
    async function wakeUpBackendServer() {
      await JoblyApi.wakeUpHeroku();
    }
    wakeUpBackendServer();
  }, []);

  return (
    <div className="home">
      <br /><br /><br /><br />
      {username ? (
        <div>
          <h1>Welcome to Jobly, {username}!</h1><br/>
          <h6 className="caption">Jobly is a website that allows you to search for </h6>
          <h6 className="caption">fake companies and their job openings! </h6>
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
