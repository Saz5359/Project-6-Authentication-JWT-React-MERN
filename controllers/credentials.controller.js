const credentials = require("../model/credentials");
const check = require("../middleware/authJwt");

//List all credentials in the users division and org-unit
exports.listAllCredentials = async (req, res) => {
  const filter = {
    org_unit: req.org_unit,
    division: req.division,
  };

  //Try to get the data
  try {
    const foundCredentials = await credentials.find(filter);
    //if nothing is returned then nothing was found so the user is alerted
    if (foundCredentials === null) {
      res.status(500).send({
        message: "Could not retrieve the credentials from the database.",
      });
    } else {
      res.send(foundCredentials);
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "Could not retrieve the credentials from the database.",
    });
  }
};

//Add credential to credential database
exports.addCredential = async (req, res) => {
  const credentialSchema = new credentials({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    org_unit: req.body.org_unit,
    division: req.body.division,
  });

  try {
    const newCredential = await credentialSchema.save();
    //if nothing is returned then the credential was not added so the user is alerted
    if (newCredential === null) {
      res.status(500).send({
        error: "Error occurred",
        message: "Could not add this credential!",
      });
    } else {
      res.send({
        message: `Successfully added credentials`,
      });
    }
  } catch (error) {
    res.send({
      error: error.message,
      message: "An error ocurred! Could not add credential",
    });
  }
};

//Update a user credential
exports.updateCredential = async function (req, res) {
  const credentialToUpdate = req.body.condition;
  let updateCredential;

  try {
    //I was getting an error when updating an email using an email as a filter so
    // I added this if statement for upgrading emails
    if (req.body.email) {
      updateCredential = await credentials.findOneAndUpdate({
        email: req.body.email,
        email: credentialToUpdate,
      });
    } else {
      //A function from the auth middleware checks what field is being updated
      //and returns it in mongoose format
      const updateFilter = check.checkUpdateFields(req.body);

      updateCredential = await credentials.updateOne(
        { email: req.body.condition },
        { $set: updateFilter }
      );
    }

    //if nothing is returned then the credential was not updated so the user is alerted
    if (updateCredential == null) {
      res.status(500).send({
        error: "ERROR!",
        message: "Could not update this credential.",
      });
    } else {
      res.send({
        success: "Update was successful",
        message: "Updated the credential successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error could not update credential",
    });
  }
};
