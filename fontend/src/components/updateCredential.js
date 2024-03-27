import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import NoAccess from "./NoAccess";

import "../edit.css";
import ValidateUpdate from "../helper/ValidateUpdate";

//This component allows users to update a credential
function UpdateCredential() {
  const [updateName, setUpdateName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [credentialToUpdate, setCredentialToUpdate] = useState("");
  const [allCredentials, setAllCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  //fetch all credentials for the select form below
  useEffect(() => {
    fetch("/credentials/updateList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    })
      .then((res) => res.json())
      .then((data) => {
        //if there is an error then the user is alerted
        if (data.error) {
          setShow(true);
          setMessage(data.message);
        } else {
          setAllCredentials(data);
          setHasAccess(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //send request to the backend of the app
  async function update(e) {
    e.preventDefault();
    if (ValidateUpdate(credentialToUpdate, updateName, newValue).error) {
      setErrors(ValidateUpdate(credentialToUpdate, updateName, newValue));
      setShow(true);
    } else {
      setIsLoading(true);
      fetch("/credentials/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: getUpdateData(updateName, newValue),
      })
        .then((res) => res.json())
        .then((data) => {
          //if there is an error from the backend then the user is alerted
          if (data.error) {
            setShow(true);
            setMessage(data.message);
          } else {
            setSuccess(true);
            navigate("/home");
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  //This function check's what is being updated and then returns it the mongoose syntax
  //This function ensures there are no errors
  const getUpdateData = (toUpdate, valueToUpdate) => {
    if (toUpdate === "name") {
      return JSON.stringify({
        condition: credentialToUpdate,
        name: valueToUpdate,
      });
    } else if (toUpdate === "email") {
      return JSON.stringify({
        condition: credentialToUpdate,
        email: valueToUpdate,
      });
    } else if (toUpdate === "password") {
      return JSON.stringify({
        condition: credentialToUpdate,
        password: valueToUpdate,
      });
    }
  };

  function close() {
    navigate("/home");
  }

  return (
    <>
      {/* If the user does not have access to the resource then they will not be able to 
    view the page */}
      {hasAccess ? (
        <div>
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
              <div className="text">Update a Credential</div>
              <p>
                You can not update the Organisational unit and division you
                belong to. They can only be updated by an Admin
              </p>
            </div>
            <div className="inputs">
              <div className="input">
                <img
                  src="https://w7.pngwing.com/pngs/930/532/png-transparent-computer-icons-personal-web-page-user-name-icon-monochrome-user-tag.png"
                  alt=""
                />
                <select onChange={(e) => setCredentialToUpdate(e.target.value)}>
                  <option value="">
                    Select the credential you want to Update
                  </option>
                  {allCredentials.map((credential, i) => {
                    return (
                      <option key={i} value={credential.email}>
                        {credential.email}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input">
                <img
                  src="https://www.expectmorearizona.org/wp-content/uploads/2019/01/Email-Icon.png"
                  alt=""
                />
                <select onChange={(e) => setUpdateName(e.target.value)}>
                  <option value="null">
                    Select the Field you want to Update
                  </option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                </select>
              </div>
              <div className="input">
                <img
                  src="http://www.newdesignfile.com/postpic/2010/11/password-security-icon_355941.png"
                  alt=""
                />
                {updateName === "email" ? (
                  <input
                    type="email"
                    placeholder="Enter new Email"
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                ) : updateName === "password" ? (
                  <input
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Enter new Name"
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                )}
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
                <div className="submit" onClick={update}>
                  Update Credential
                </div>
              )}
            </div>
          </Card>
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
              {errors.user && <p style={{ color: "red" }}>{errors.user}</p>}
              {errors.field && <p style={{ color: "red" }}>{errors.field}</p>}
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </Alert>
          </div>
        </div>
      ) : (
        <NoAccess />
      )}
    </>
  );
}

export default UpdateCredential;
