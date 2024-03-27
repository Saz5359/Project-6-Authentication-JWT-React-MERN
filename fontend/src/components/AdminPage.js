import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "../admin-page.css";
import { Gauge } from "@mui/x-charts/Gauge";
import NoAccess from "./NoAccess";
import NotLoggedIn from "./NotLoggedIn";

//This component displays the admin page of the app
function AdminPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasAccess, setHasAccess] = useState(false);

  const token = sessionStorage.getItem("token");
  const loggedIn = sessionStorage.getItem("loggedIn");

  //Get all users
  useEffect(() => {
    setIsLoading(true);
    fetch("/user/", {
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
        //if there are any errors from the backend then the user is alerted
        if (data.error) {
          setShow(true);
          setMessage(data.message);
          console.log("Error");
        } else {
          setAllUsers(data);
          setHasAccess(true);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refreshKey]);

  //Logs the user out of the app
  //The user can not access the app unless they login
  function handleLogOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("org_unit");
    sessionStorage.removeItem("division");
    sessionStorage.setItem("loggedIn", false);
  }

  return (
    <>
      {/* If the user does not have access to the resource then they will not be able to 
    view the page */}
      {hasAccess ? (
        <>
          <div className="home-container">
            <div className="navBar">
              <div className="nav-top">
                <box-icon name="lock" size="md" color="white"></box-icon>
                <h3>Cool-Tech</h3>
                <div className="links">
                  <box-icon name="user-plus" color="white" size="sm"></box-icon>
                  <Link to="/AddCred">Add Credential</Link>
                </div>
                <div className="links">
                  <box-icon
                    type="solid"
                    name="chevrons-up"
                    color="white"
                    size="sm"
                  ></box-icon>
                  <Link to="/EditCred">Update Credential</Link>
                </div>
                <div className="links">
                  <box-icon
                    type="solid"
                    name="home"
                    color="white"
                    size="sm"
                  ></box-icon>
                  <Link to="/home">Home Page</Link>
                </div>
                <div className="links">
                  <box-icon
                    type="solid"
                    name="help-circle"
                    color="#ffffff"
                  ></box-icon>
                  <a href="">Help</a>
                </div>
                <div className="links">
                  <box-icon name="cog" color="#ffffff"></box-icon>
                  <a href="">Settings</a>
                </div>
                <div className="links">
                  <box-icon name="log-out" color="#ffffff"></box-icon>
                  <Link to="/" onClick={handleLogOut}>
                    Log Out
                  </Link>
                </div>
              </div>
            </div>

            <div className="dashboard">
              <div className="dashboard-right">
                <box-icon
                  name="user-account"
                  type="solid"
                  size="sm"
                  color="black"
                ></box-icon>
                <h2>Admin DashBoard</h2>
              </div>
              <div className="dashboard-left">
                <box-icon type="solid" name="envelope"></box-icon>
                <box-icon type="solid" name="bell"></box-icon>
                <div className="user-box">
                  <box-icon
                    type="solid"
                    name="user-circle"
                    size="md"
                  ></box-icon>
                  <h2>Admin</h2>
                  <box-icon
                    type="solid"
                    name="chevron-down"
                    size="sm"
                  ></box-icon>
                </div>
              </div>
            </div>

            <div className="main-container">
              <div className="admin-container">
                <div className="card-container">
                  <div className="users-info">
                    <div className="info-card left card">
                      <div className="head">
                        <h1>Weekly Sales</h1>
                        <box-icon
                          name="line-chart"
                          size="sm"
                          color="#fff"
                        ></box-icon>
                      </div>
                      <h2>R 200 000</h2>
                      <h3>Increased by 60%</h3>
                    </div>
                    <div className="info-card center card">
                      <div className="head">
                        <h1>Weekly Orders</h1>
                        <box-icon
                          name="bookmark"
                          size="sm"
                          color="#fff"
                        ></box-icon>
                      </div>
                      <h2>45 000</h2>
                      <h3>Decreased by 60%</h3>
                    </div>
                    <div className="info-card right card">
                      <div className="head">
                        <h1>Visitors Online</h1>
                        <box-icon
                          type="solid"
                          name="diamond"
                          size="sm"
                          color="#fff"
                        ></box-icon>
                      </div>
                      <h2>95 000</h2>
                      <h3>Increased by 5%</h3>
                    </div>
                  </div>
                </div>
                <div className="list-container">
                  <div className="table-container">
                    <h2>User Repository:</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Organisational unit</th>
                          <th>Division</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <Spinner animation="border" variant="dark" />
                        ) : (
                          allUsers.map((data, i) => {
                            return (
                              <tr key={i}>
                                <td key={data.name}>{data.name}</td>
                                <td key={data.email}>{data.email}</td>
                                <td key={i + " hidden"}>{data.password}</td>
                                <td key={data.org_unit + "o"}>
                                  {data.org_unit}
                                </td>
                                <td key={data.division + "d"}>
                                  {data.division}
                                </td>
                                <td key={data.role + "r"}>{data.role}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                    {/* If there is an error the user will be alerted */}
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
                  <div className="table-chart">
                    <h2>Update User Info</h2>
                    <UpdateUser
                      users={allUsers}
                      setRefreshKey={setRefreshKey}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoAccess />
      )}
    </>
  );
}

export default AdminPage;
{
  /* 
  <div className="admin-dashboard">
            <div className="admin">
              <box-icon
                name="user-account"
                type="solid"
                size="md"
                color="black"
              ></box-icon>
              <h2>Admin DashBoard</h2>
            </div>

            <div className="admin">
              <Link to="/home">
                <box-icon type="solid" name="home" size="md"></box-icon>{" "}
              </Link>

              <box-icon
                type="solid"
                name="envelope"
                size="md"
                color="black"
              ></box-icon>
              <box-icon
                type="solid"
                name="bell"
                size="md"
                color="black"
              ></box-icon>
              <Link to="/" onClick={handleLogOut}>
                <box-icon name="log-out" size="md" color="black"></box-icon>
              </Link>
            </div>
          </div>
          <div className="admin-container">
            <div className="card-container">
              <div className="user-card">
                <h2>Number of users</h2>
                <Gauge width={200} height={200} value={50} color="#fdb462" />
              </div>
              <div className="users-info">
                <div className="info-card left card">
                  <div className="head">
                    <h1>Weekly Sales</h1>
                    <box-icon
                      name="line-chart"
                      size="sm"
                      color="#fff"
                    ></box-icon>
                  </div>
                  <h2>R 200 000</h2>
                  <h3>Increased by 60%</h3>
                </div>
                <div className="info-card center card">
                  <div className="head">
                    <h1>Weekly Orders</h1>
                    <box-icon name="bookmark" size="sm" color="#fff"></box-icon>
                  </div>
                  <h2>45 000</h2>
                  <h3>Decreased by 60%</h3>
                </div>
                <div className="info-card right card">
                  <div className="head">
                    <h1>Visitors Online</h1>
                    <box-icon
                      type="solid"
                      name="diamond"
                      size="sm"
                      color="#fff"
                    ></box-icon>
                  </div>
                  <h2>95 000</h2>
                  <h3>Increased by 5%</h3>
                </div>
              </div>
            </div>
            <div className="list-container">
              <div className="table-container">
                <h2>User Repository:</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Organisational unit</th>
                      <th>Division</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <Spinner animation="border" variant="dark" />
                    ) : (
                      allUsers.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td key={data.name}>{data.name}</td>
                            <td key={data.email}>{data.email}</td>
                            <td key={i + " hidden"}>{data.password}</td>
                            <td key={data.org_unit + "o"}>{data.org_unit}</td>
                            <td key={data.division + "d"}>{data.division}</td>
                            <td key={data.role + "r"}>{data.role}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                If there is an error the user will be alerted
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
              <div className="table-chart">
                <h2>Update User Info</h2>
                <UpdateUser users={allUsers} setRefreshKey={setRefreshKey} />
              </div>
            </div>
          </div> */
}
