import React, {useContext} from "react";
import "../NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import UserContext from './Common/UserContext'

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({logout}) {
  const {currentUser} = useContext(UserContext)
  
  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Nav>
          <NavLink exact to="/" className="m-2">Home</NavLink>
          <NavLink className="m-2" to="/Companies">Companies</NavLink>
          <NavLink className="m-2" to="/Jobs">Jobs</NavLink>
          </Nav>
          <Nav>
          {!currentUser
            ? ( <div>
                  <NavLink to="/Login" className="m-2">Login</NavLink>
                  <NavLink to="/Signup" className="m-2">Signup</NavLink>
                </div>
          ) : ( <div>
            <NavLink to="/Profile" className="m-2">Profile</NavLink>
            <NavLink to="/" className="m-2" onClick={logout}>Logout </NavLink>
          </div>
        )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
