import React, { useEffect } from "react";
import { useState } from "react";
import CredentialList from "./CredentialList";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../home.css";
import "boxicons";
import { Link } from "react-router-dom";
import Chart from "../helper/Chart";
import Chart2 from "../helper/Chart2";
import NoAccess from "./NoAccess";

//This component displays the home page
function Home() {
  const [results, setResults] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);

  const token = sessionStorage.getItem("token");
  const loggedIn = sessionStorage.getItem("loggedIn");

  //send request to the backend
  useEffect(() => {
    fetch("/auth/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          //store the users org unit and division so they can be used when adding a new credential
          sessionStorage.setItem("org_unit", data.org_unit);
          sessionStorage.setItem("division", data.division);
          setResults(data);
          setHasAccess(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //Logs the user out of the app
  //The user can not access the app unless they login
  function handleLogOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("org_unit");
    sessionStorage.removeItem("division");
    sessionStorage.setItem("loggedIn", false);
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You do not have access to this resource
    </Tooltip>
  );

  return (
    <>
      {/* If the user does not have access to the resource then they will not be able to 
    view the page */}
      {hasAccess ? (
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
                {results.role === "Manager" || results.role === "Admin" ? (
                  <Link to="/EditCred">Update Credential</Link>
                ) : (
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <a className="no-access">Update Credential</a>
                  </OverlayTrigger>
                )}
              </div>
              <div className="links">
                <box-icon
                  type="solid"
                  name="user-account"
                  color="white"
                  size="sm"
                ></box-icon>
                {results.role === "Admin" ? (
                  <Link to="/Admin">Admin Page</Link>
                ) : (
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <a className="no-access">Admin Page</a>
                  </OverlayTrigger>
                )}
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
              <box-icon type="solid" name="home" size="sm"></box-icon>
              <h2>Credential Dashboard</h2>
            </div>
            <div className="dashboard-left">
              <box-icon type="solid" name="envelope"></box-icon>
              <box-icon type="solid" name="bell"></box-icon>
              <div className="user-box">
                <box-icon type="solid" name="user-circle" size="md"></box-icon>
                <h2>{results.name}</h2>
                <box-icon type="solid" name="chevron-down" size="sm"></box-icon>
              </div>
            </div>
          </div>

          <div className="main-container">
            <h1>Organisational unit & Division Report:</h1>
            <div className="org-container">
              <div className="chart-card">
                <Chart />
              </div>
              <div className="org-card">
                <box-icon name="group" color="#ffffff"></box-icon>
                <h2>User Organizational Unit:</h2>
                <h2>{results.org_unit}</h2>
                <p>10 Active users</p>
              </div>
              <div className="org-card division">
                <box-icon name="buildings" color="#ffffff"></box-icon>
                <h2>User Division:</h2>
                <h2>{results.division}</h2>
                <p>10 Active users</p>
              </div>
            </div>
            <div className="repository">
              <div className="table">
                <CredentialList />
              </div>
              <div className="line-chart">
                <Chart2 />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoAccess />
      )}
    </>
  );
}

export default Home;
