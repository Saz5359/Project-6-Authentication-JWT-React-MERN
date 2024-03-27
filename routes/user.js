const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const auth = require("../middleware/authJwt");

//Get all users
router.get("/", auth.authenticateAdmin, userController.listAllUsers);

//Update user
router.patch("/update", auth.authenticateAdmin, userController.updateUser);

module.exports = router;
