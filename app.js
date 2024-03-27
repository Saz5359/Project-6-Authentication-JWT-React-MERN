const express = require("express");
const app = express();
const mongoose = require("mongoose");
//This is for the password, username, and key for the mongoDB database
const db = require("./config/db.config");
const PORT = process.env.PORT || 8080;

// parse requests of content-type - application/json
app.use(express.json());

//connect to database
const url = `mongodb+srv://${db.username}:${db.password}@hyperion-test.xanjmyq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(url);
mongoose.connection.on("error", function () {
  console.log("Connection to Mongo established.");
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

//App entry Authentication routes
const authenticationRoute = require("./routes/auth");
app.use("/auth", authenticationRoute);

//Credentials routes
const credentialsRoute = require("./routes/credentials");
app.use("/credentials", credentialsRoute);

//User routes
const usersRoute = require("./routes/user");
app.use("/user", usersRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
