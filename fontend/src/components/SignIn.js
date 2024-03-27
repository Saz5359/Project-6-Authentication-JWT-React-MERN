import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import "../form.css";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

//This component displays the login page
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  //send data to the backend
  async function login(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //if there is an error in the backend then the user is alerted
        if (data.error) {
          setShow(true);
          setMessage(data.message);
        } //if a token is returned then the login was a success and user is sent to the home page
        else if (data.token) {
          sessionStorage.setItem("token", data.token);
          setSuccess(true);
          sessionStorage.setItem("loggedIn", true);
          navigate("/home");
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="user-signinBx">
            <div className="imgBx">
              <img src={image1} alt={image2} />
            </div>
            <div className="formBx">
              <form>
                <h2>Sign In</h2>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isLoading ? (
                  <Spinner animation="border" />
                ) : success ? (
                  <img
                    src="https://pluspng.com/img-png/success-png-png-svg-512.png"
                    className="success"
                  />
                ) : (
                  <input type="submit" value="Login" onClick={login} />
                )}
                <p className="signup">
                  don't have an account?
                  <Nav>
                    <Nav.Link href="/register">
                      <a>Sign Up.</a>
                    </Nav.Link>
                  </Nav>
                </p>{" "}
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
