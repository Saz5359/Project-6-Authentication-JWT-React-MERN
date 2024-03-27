const express = require("express");
const router = express.Router();
const credentialsController = require("../controllers/credentials.controller");
const auth = require("../middleware/authJwt");

//Get all credentials
router.get(
  "/",
  auth.authenticateNormal,
  credentialsController.listAllCredentials
);

//Get credentials for Update Select form
router.get(
  "/updateList",
  auth.authenticateManager,
  credentialsController.listAllCredentials
);

//update credentials
router.patch(
  "/update",
  auth.authenticateManager,
  credentialsController.updateCredential
);

//create credentials
router.post(
  "/create",
  auth.authenticateNormal,
  credentialsController.addCredential
);

module.exports = router;
