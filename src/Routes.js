import './App.css';
import { Switch, Route  } from "react-router-dom";
import React  from "react";

import Home from "./components/Home";
import Companies from "./components/CompanyComponents/Companies";
import Company from "./components/CompanyComponents/Company";
import Jobs from "./components/JobComponents/Jobs";
import LoginForm from "./components/Login";
import Profile from "./components/Profile";
import RegisterForm from "./components/Signup";

/** All routes of website along with a catch all route to display a not found route */

function Routes({ login, signup, currentUser }) {
  return (
    <div>
        <Switch>
            <Route exact path="/">
                <Home currentUser={currentUser}/>
            </Route>
            <Route exact path="/Companies">
                <Companies />
            </Route>
            <Route exact path="/Companies/:handle" >
                <Company />
            </Route>
            <Route exact path="/Jobs">
                <Jobs />
            </Route>
            <Route exact path="/Login">
                <LoginForm login={login}/>
            </Route>
            <Route exact path="/Signup">
                <RegisterForm signup={signup}/>
            </Route>
            <Route exact path="/Profile">
                <Profile />
            </Route>
            <Route><h1>Not Found!</h1></Route>
        </Switch>
    </div>
  );
}

export default Routes;
