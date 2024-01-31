import React, { useState } from "react";
import "./CreateUser.css";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from '../features/addUserSlice'

function CreateUser(props) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [profilePictureError, setProfilePictureError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (profile_picture === null) {
      setProfilePictureError(true);
      return;
    }

    const formdata = new FormData();

    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("profile_picture", profile_picture);

    if (password == confirmPassword) {
      dispatch(addUser(formdata));
      if (props.props.name == "Signup") {
        alert('account created');
        navigate("/");
      } else {
        navigate(-1);
      }
    } else {
      setPasswordMatchError(true);
      setConfirmPassword('')
      setPassword('')
      setProfilePictureError(false)
      return;
    }
  };

  return (
    <div className="create-container">
      <form
        className="form-signin"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <h1 className="form-signin-heading" style={{ marginBottom: "10px" }}>
          {props.props.name}
        </h1>
        <input
          type="text"
          className="form-control"
          name="first_name"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required=""
          autoFocus=""
        />
        <input
          type="text"
          className="form-control"
          name="last_name"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required=""
          autoFocus=""
        />
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required=""
          autoFocus=""
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required=""
        />
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required=""
        />
        {passwordMatchError && <p>Passwords do not match. Please try again.</p>}
        <div class="upload-section">
          <label for="profile-picture" class="file-label">
            Upload Profile Image
            <input
              id="profile-picture"
              class="upload-input"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              name="profile_picture"
            />
          </label>
          {profilePictureError && (<p style={{ color: "red" }}>Please upload a profile picture.</p>)}
          <div>
            <button class="create-button" type="submit">
              Create
            </button>
            <br />
            <Link to={"/"}>
              {props.props.name == "Signup" && (
                <button class="delete-button" type="submit">
                  Cancel
                </button>
              )}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
