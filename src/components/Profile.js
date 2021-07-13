import React, { useState, useContext } from "react";
import UserContext from './Common/UserContext'
import Alert from "./Common/Alert";
import JoblyApi from "../Api"

/* Home page that displays login and signup button links */

function Profile(updateProfile) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({

    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.editProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setIsUpdated(true)

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div><br/>
      <p>Update your password by entering your a new one below</p>

      <div className="ProfileForm">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                {isUpdated
                    ? <h4>Your password has been updated successfully!</h4>
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Update
                </button>
              </form>
            </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;
