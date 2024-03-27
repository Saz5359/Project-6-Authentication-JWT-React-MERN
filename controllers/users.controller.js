const users = require("../model/users");

//Register a new user
exports.signup = async (req, res, next) => {
  const newUser = new users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    org_unit: req.body.org_unit,
    division: req.body.division,
  });

  try {
    const newCreatedUser = await newUser.save();
    //Store the new user in req.user variable to be used in the home page
    req.user = newCreatedUser;
    next();
  } catch (error) {
    res.send({ error: error.message, message: "Could not register user!" });
  }
};

//Finds a user and sign's them in to the app
exports.login = async (req, res, next) => {
  const userEmail = req.body.email;

  try {
    const foundUser = await users.findOne({ email: userEmail });

    //if nothing is returned then the user was not found so the user is alerted
    if (foundUser === null) {
      res.send({
        error: "No user",
        message: "User not found!",
      });
    } else {
      //Store the user in req.user variable to be used in the home page
      req.user = foundUser;
      next();
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "Could not find user!",
    });
  }
};

//List all users
exports.listAllUsers = async function (req, res) {
  try {
    const allUsers = await users.find();
    //if nothing is returned then the users were not found so the admin is alerted
    if (allUsers === null) {
      res.send({
        error: "No users",
        message: "Could not retrieve the users!",
      });
    } else {
      res.json(allUsers);
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "Could not retrieve the users!",
    });
  }
};

//update, assign and design user's org units, divisions and roles
exports.updateUser = async (req, res) => {
  const userToUpdate = req.body.email;
  const condition = req.body.condition;
  const newValue = req.body.filter;
  let assignedUser;

  try {
    //this if else statement is used to update the user based on the condition
    //which is what will be updated
    if (condition === "org_unit") {
      assignedUser = await users.findOneAndUpdate(
        { email: userToUpdate },
        { org_unit: newValue }
      );
    } else if (condition === "division") {
      assignedUser = await users.findOneAndUpdate(
        { email: userToUpdate },
        { division: newValue }
      );
    } else if (condition === "role") {
      assignedUser = await users.findOneAndUpdate(
        { email: userToUpdate },
        { role: newValue }
      );
    }

    //if nothing is returned then the user could not be updated so the admin is alerted
    if (assignedUser == null) {
      res.send({ error: "No user ", message: "Cannot find user" });
    } else {
      res.send({ message: "User has been Successfully updated!" });
    }
  } catch (error) {
    res.json({ error: error, message: "Error could not update job" });
  }
};
