import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import ValidateUserUpdate from "../helper/ValidateUserUpdate";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

//This component updates a user
function UpdateUser({ users, setRefreshKey }) {
  const [userToUpdate, setUserToUpdate] = useState();
  const [newValue, setNewValue] = useState("");
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const token = sessionStorage.getItem("token");

  //send data to the backend
  async function editUser(e) {
    e.preventDefault();
    if (ValidateUserUpdate(userToUpdate, fieldToUpdate, newValue).error) {
      setErrors(ValidateUserUpdate(userToUpdate, fieldToUpdate, newValue));
      console.log(errors);
      console.log(fieldToUpdate);
    } else {
      setIsLoading(true);
      fetch("/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userToUpdate,
          condition: fieldToUpdate,
          filter: newValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //remove previous errors
          setErrors(ValidateUserUpdate(userToUpdate, fieldToUpdate, newValue));
          //if there is an error in the backend then the user is alerted
          if (data.error) {
            setShow(true);
            setMessage(data.message);
          } else {
            setSuccess(true);
            //refresh the user table
            setRefreshKey((oldKey) => oldKey + 1);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Title>
          <box-icon
            type="solid"
            name="user-circle"
            size="lg"
            color="#ffffff"
          ></box-icon>
        </Card.Title>
        <Card.Title>Update User</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Select the User you want to update
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setUserToUpdate(e.target.value)}
            >
              <option value="null">Select the user you want to Update </option>
              {users.map((user, i) => {
                return (
                  <option key={i} value={user.email}>
                    {user.email}
                  </option>
                );
              })}
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item>
            What field do you want to update
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setFieldToUpdate(e.target.value)}
            >
              <option>Select the Field you want to Update </option>
              <option value="org_unit">Organisational Unit</option>
              <option value="division">Division</option>
              <option value="role">User Role</option>
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item>
            Enter the new value
            {fieldToUpdate === "org_unit" ? (
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setNewValue(e.target.value)}
              >
                <option>Select the new User Organizational</option>
                <option value="Not Assigned">Unassign</option>
                <option value="News management">News management</option>
                <option value="Software reviews">Software reviews</option>
                <option value="Hardware reviews">Hardware reviews</option>
                <option value="Opinion publishing">Opinion publishing</option>
              </Form.Select>
            ) : fieldToUpdate === "role" ? (
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setNewValue(e.target.value)}
              >
                <option>Select the new User Role</option>
                <option value="Not Assigned">Unassign role</option>
                <option value="Normal">Normal</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            ) : (
              <Form.Control
                type="text"
                placeholder="Enter the new Division"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => setNewValue(e.target.value)}
              />
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            {isLoading ? (
              <Spinner animation="border" variant="dark" />
            ) : (
              <input
                type="submit"
                value="Update User"
                onClick={editUser}
                className="update-btn"
              />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Alert
        show={show}
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
        className="alert-body"
      >
        <Alert.Heading>Error!</Alert.Heading>
        {message}
      </Alert>
    </div>
  );
}

export default UpdateUser;
{
  /* <div className="updateWrap">
      <h1>Update User</h1>
      <br />
      <div className="updateContainer">
        <h3>Select the Credential you want to update</h3>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setUserToUpdate(e.target.value)}
        >
          <option value="null">Select the user you want to Update </option>
          {users.map((user, i) => {
            return (
              <option key={i} value={user.email}>
                {user.email}
              </option>
            );
          })}
        </Form.Select>
        {errors.user && <p style={{ color: "red" }}>{errors.user}</p>}
        <br />
        <h3>What field do you want to update</h3>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setFieldToUpdate(e.target.value)}
        >
          <option>Select the Field you want to Update </option>
          <option value="org_unit">Organisational Unit</option>
          <option value="division">Division</option>
          <option value="role">User Role</option>
        </Form.Select>
        {errors.field && <p style={{ color: "red" }}>{errors.field}</p>}
        <br />
        <h3>Enter the new value</h3>
        {fieldToUpdate === "org_unit" ? (
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setNewValue(e.target.value)}
          >
            <option>Select the new User Organizational</option>
            <option value="Not Assigned">Unassign</option>
            <option value="News management">News management</option>
            <option value="Software reviews">Software reviews</option>
            <option value="Hardware reviews">Hardware reviews</option>
            <option value="Opinion publishing">Opinion publishing</option>
          </Form.Select>
        ) : fieldToUpdate === "role" ? (
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setNewValue(e.target.value)}
          >
            <option>Select the new User Role</option>
            <option value="Not Assigned">Unassign role</option>
            <option value="Normal">Normal</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </Form.Select>
        ) : (
          <Form.Control
            type="text"
            placeholder="Enter the new Division"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setNewValue(e.target.value)}
          />
        )}
        {errors.org_unit && <p style={{ color: "red" }}>{errors.org_unit}</p>}
        {errors.division && <p style={{ color: "red" }}>{errors.division}</p>}
        {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
        <div>
          {isLoading ? (
            <button type="submit" className="button-container">
              <Spinner animation="border" variant="light" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={editUser}
              className="button-container"
            >
              Update User
            </button>
          )}
        </div>
      </div>
      <Alert
        show={show}
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
        className="alert-body"
      >
        <Alert.Heading>Error!</Alert.Heading>
        {message}
      </Alert>
    </div> */
}
