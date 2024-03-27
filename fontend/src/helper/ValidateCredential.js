//This function validates the user input when a user adds a credential
export default function ValidateCredential(name, email, password) {
  //This object stores all the errors
  const errors = {};

  //checks if the string is an email
  const email_pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //password must contain at least one digit one lower one upper and min length is 8
  const password_pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;

  //if the user added a name
  if (!name) {
    errors.name = " Name is Required";
    errors.error = true;
  }

  //if no email was provided
  if (!email) {
    errors.email = "Email is Required";
    errors.error = true;
  } //check if provided email is an email
  else if (!email_pattern.test(String(email).toLowerCase())) {
    errors.email = "Email is not Valid";
    errors.error = true;
  }

  //if no password was provided
  if (!password) {
    errors.password = "Password is Required";
    errors.error = true;
  } //test to see if password is valid
  else if (!password_pattern.test(password)) {
    errors.password =
      "Password must contain at least 1 digit, one lowercase ,one Uppercase letter and must be at least 8 characters long";
    errors.error = true;
  }
  return errors;
}
