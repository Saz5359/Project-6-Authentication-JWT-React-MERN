import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import NotLoggedIn from "./NotLoggedIn";

import "../edit.css";
import ValidateCredential from "../helper/ValidateCredential";

//This component adds a credential to the database
function AddCredential() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  //When adding a credential you add it to the division and org unit you belong to
  //so the org unit and division is set by default
  const token = sessionStorage.getItem("token");
  const userOrganisation = sessionStorage.getItem("org_unit");
  const userDivision = sessionStorage.getItem("division");

  const loggedIn = sessionStorage.getItem("loggedIn");
  console.log(loggedIn);

  //Navigate through app
  const navigate = useNavigate();

  //check for errors and send data to the backend of the app
  function saveCredentials(e) {
    e.preventDefault();
    //if there is an error then the user is alerted and Shown what kind of error it is
    if (ValidateCredential(name, email, password).error) {
      setErrors(ValidateCredential(name, email, password));
      setShow(true);
    } else {
      //if there are no errors then the data is sent to the backend
      setIsLoading(true);
      fetch("/credentials/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          org_unit: userOrganisation,
          division: userDivision,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //if there is an error from the backend then the user is alerted
          if (data.error) {
            setShow(true);
            setMessage(data.message);
          } else {
            //if there are no errors then a success icon is shown and the user is navigated to
            //the home page
            setSuccess(true);
            navigate("/home");
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  //function to navigate back to the home page when the close button 'x' is clicked
  function close() {
    navigate("/home");
  }

  return (
    <>
      {/* If the user is not logged in then they will view a message telling them to login in order
    to view the page */}
      {!loggedIn ? (
        <NotLoggedIn />
      ) : (
        <div>
          {/* Below is the card to add a credential */}
          <Card style={{ width: "470px" }}>
            <div className="close">
              {" "}
              <CloseButton onClick={close} />{" "}
            </div>
            <div className="header">
              <img
                src="https://d30y9cdsu7xlg0.cloudfront.net/png/6478-200.png"
                className="signIn"
              />
              <div className="text">Add a new Credential</div>
              <p>
                You can only add Credentials to the Organisational unit and
                division you belong to so they are set by default
              </p>
            </div>
            <div className="inputs">
              <div className="input">
                <img
                  src="https://w7.pngwing.com/pngs/930/532/png-transparent-computer-icons-personal-web-page-user-name-icon-monochrome-user-tag.png"
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input">
                <img
                  src="https://www.expectmorearizona.org/wp-content/uploads/2019/01/Email-Icon.png"
                  alt=""
                />
                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <img
                  src="http://www.newdesignfile.com/postpic/2010/11/password-security-icon_355941.png"
                  alt=""
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input">
                <img
                  src="https://lh3.googleusercontent.com/yUrd-Gms0-us7g-kV-_YTfB9XRtw-nDJW4mEfvgsUUASAGZIn7CfNmAehXpWltwTWRZCkgOZQ6aW-ZSEivGCnf23DIL6F9x25n-_=s0"
                  alt=""
                />
                <input
                  type="text"
                  placeholder="loading your Organisational unit..."
                  value={userOrganisation}
                />
              </div>
              <div className="input">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/business-person-actions/128/meeting-businessmen-talks-512.png"
                  alt=""
                />
                <input
                  type="input"
                  placeholder="Loading your division..."
                  value={userDivision}
                />
              </div>
            </div>
            <div className="submit-container">
              {isLoading ? (
                <Spinner animation="border" />
              ) : success ? (
                <img
                  src="https://pluspng.com/img-png/success-png-png-svg-512.png"
                  className="success"
                />
              ) : (
                <div className="submit" onClick={saveCredentials}>
                  Add Credential
                </div>
              )}
            </div>
          </Card>
          {/*If there is an error it is displayed below*/}
          <div className="alertBox">
            <Alert
              show={show}
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
              className="alert-body"
            >
              <Alert.Heading>Error!</Alert.Heading>
              {message}
              {/*
          Each input field is checked and if there is an error for 1/3 fields
          then the error message for then field is displayed while the others are not
          */}
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCredential;
