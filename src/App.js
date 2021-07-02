
import React, { useState, useEffect } from "react";
import Routes from './Routes'
import NavBar from './components/NavBar'
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./Api";
import jwt from "jsonwebtoken";
import UserContext from './components/Common/UserContext'
import useLocalStorage from "./hooks/useLocalStorage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

/* Entire web app. Holds state for the currentUser, token, and jobs a user has applied for.
  Grabs the current user that is logged in (if logged in). Holds login and signup functions. 
  Keeps track of which jobs a user has applied to. Renders Navbar and routes.
   */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [applicationIds, setApplicationIds] = useState(new Set([]));


  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let userResult = await JoblyApi.getCurrentUser(username);
          setCurrentUser(userResult);
          // setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    // once the data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    getCurrentUser();

  }, [token]);

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }


  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
        <NavBar logout={logout} />
        <Container>
        <Routes login={login} signup={signup} currentUser={currentUser}/>
        </Container>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
