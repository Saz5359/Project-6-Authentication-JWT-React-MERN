const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userControllers = require("../controllers/users.controller");
const auth = require("../middleware/authJwt");
const config = require("../config/db.config");

//Register user route
router.post("/register", userControllers.signup, (req, res) => {
  //user details from user sign up are used to create the jwt token
  //and send it to the frontend
  const user = req.user;
  payload = {
    name: user.name,
    org_unit: user.org_unit,
    division: user.division,
    role: user.role,
  };

  const token = jwt.sign(JSON.stringify(payload), config.secret, {
    algorithm: "HS256",
  });
  res.send({ token: token, message: "Registered successfully" });
});

//Login Route
router.post("/login", userControllers.login, (req, res) => {
  //store user password from database and store it in a variable
  //and compare it to the user input
  const password = req.body.password;
  const user = req.user;

  //if the password matches user gets their token and can log in
  if (password === user.password) {
    payload = {
      name: user.name,
      org_unit: user.org_unit,
      division: user.division,
      role: user.role,
    };

    const token = jwt.sign(JSON.stringify(payload), config.secret, {
      algorithm: "HS256",
    });
    res.send({ token: token, message: "Logged in successfully" });
  } else {
    res.status(403).send({
      error: "Incorrect password",
      message: "You entered an incorrect password.",
    });
  }
});

//Home page of the app
router.post("/home", auth.authenticateNormal, (req, res) => {
  //send user details to the frontend to be displayed
  try {
    res.send({
      name: req.name,
      role: req.role,
      org_unit: req.org_unit,
      division: req.division,
    });
  } catch (error) {
    res.send({
      error: error.message,
      message:
        "We were unable to find the organizational unit and division you belong to",
    });
  }
});

module.exports = router;
