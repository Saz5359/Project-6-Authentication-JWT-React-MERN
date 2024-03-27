const jwt = require("jsonwebtoken");
const db = require("../config/db.config");

//Check user role is normal, manager or admin
exports.authenticateNormal = async (req, res, next) => {
  // Check for token
  if (!req.headers["authorization"]) {
    return res.send({
      message: "User not logged in!",
    });
  }

  // Decode the token
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, db.secret);

    // Check user role
    if (
      decoded.role === "Normal" ||
      decoded.role === "Manager" ||
      decoded.role === "Admin"
    ) {
      // Pass on to the next middleware
      //user details will be used in the home page
      req.role = decoded.role;
      req.org_unit = decoded.org_unit;
      req.division = decoded.division;
      req.name = decoded.name;
      next();
    } else {
      res.send({
        message: "Unauthorized! You do not have access to this resource.",
      });
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "Could not verify your access for this resource.",
    });
  }
};

//Check if user role is manager or admin
exports.authenticateManager = async function (req, res, next) {
  // Check for token
  if (!req.headers["authorization"]) {
    return res.send({
      message: "User not logged in!",
    });
  }

  // Decode the token
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, db.secret);

    // Check user role
    if (decoded.role === "Manager" || decoded.role === "Admin") {
      // Pass on to the next middleware
      //user details will be used in the home page
      req.role = decoded.role;
      req.org_unit = decoded.org_unit;
      req.division = decoded.division;
      req.name = decoded.name;
      next();
    } else {
      res.send({
        error: "No Access!",
        message: "Unauthorized! You do not have access to this resource.",
      });
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "Could not verify your access for this resource.",
    });
  }
};

//Check if user role is admin
exports.authenticateAdmin = async function (req, res, next) {
  // Check for token
  if (!req.headers["authorization"]) {
    return res.send({
      message: "User not logged in!",
    });
  }

  // Decode the token
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, db.secret);

    if (decoded.role === "Admin") {
      // Pass on to the next middleware
      //user details will be used in the home page
      req.role = decoded.role;
      req.org_unit = decoded.org_unit;
      req.division = decoded.division;
      req.name = decoded.name;
      next();

      // If anything fails, send back an object with the key "error" set
      // and an accompanying user-friendly error message that will be displayed.
    } else {
      res.send({
        error: "No Access!",
        message: "Unauthorized! You do not have access to this resource.",
      });
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "Could not verify your access for this resource.",
    });
  }
};

//This function is used when a user update's a credential
//It takes the request body and returns the filed to update
exports.checkUpdateFields = (body) => {
  if (body.name) {
    return { name: body.name };
  } else if (body.password) {
    return { password: body.password };
  }
};
