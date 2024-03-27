import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import image1 from "../images/image3.jpg";
import image2 from "../images/image2.jpg";
import "../form.css";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Validation from "../helper/Validation";

//This function displays the register page of the app
function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [org_unit, setOrg_unit] = useState("");
  const [division, setDivision] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  //send data to the backend of the app
  async function register(e) {
    e.preventDefault();
    //if there are any user input errors then the user is alerted
    //If there are no errors then the data and request are sent to the backend
    if (Validation(name, email, password, org_unit, division).error) {
      setErrors(Validation(name, email, password, org_unit, division));
    } else {
      setIsLoading(true);
      fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          org_unit: org_unit,
          division: division,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //if there are any errors from the backend then the user is alerted
          if (data.error) {
            setErrors(Validation(name, email, password, org_unit, division));
            setShow(true);
            setMessage(data.message);
          } //if a token is returned then the user was registered successfully and
          //the user is moved to the home page
          else if (data.token) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("loggedIn", true);
            setSuccess(true);
            navigate("/home");
          }

          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <section>
      <div className="container">
        <div className="user-signinBx">
          <div className="imgBx">
            <img src={image2} alt={image1} />
          </div>
          <div className="formBx">
            <form>
              {errors.error ? "" : <h2>Create an Account</h2>}
              <input
                type="text"
                placeholder="Enter your name"
                autoComplete="off"
                required
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="error" style={{ color: "red" }}>
                  {errors.name}
                </p>
              )}
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="password"
                placeholder="Create a Password"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <select onChange={(e) => setOrg_unit(e.target.value)} required>
                <option value="">
                  Select the Organisational unit you belong to
                </option>
                <option value="News management">News management</option>
                <option value="Software reviews">Software reviews</option>
                <option value="Hardware reviews">Hardware reviews</option>
                <option value="Opinion publishing">Opinion publishing</option>
              </select>
              {errors.org_unit && <p className="error">{errors.org_unit}</p>}
              <input
                type="text"
                placeholder="Enter the Division you belong to"
                autoComplete="off"
                required
                onChange={(e) => setDivision(e.target.value)}
              />
              {errors.division && <p className="error">{errors.division}</p>}
              {isLoading ? (
                <Spinner animation="border" />
              ) : success ? (
                <img
                  src="https://pluspng.com/img-png/success-png-png-svg-512.png"
                  className="success"
                />
              ) : (
                <input type="submit" value="Sign Up" onClick={register} />
              )}
              {errors.error ? (
                ""
              ) : (
                <p className="signup">
                  Already have an account?
                  <Nav>
                    <Nav.Link href="/">Sign In.</Nav.Link>
                  </Nav>
                </p>
              )}
            </form>
          </div>
        </div>
        <span>
          {/*Backend errors are displayed below */}
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
        </span>
      </div>
    </section>
  );
}

export default SignUp;
