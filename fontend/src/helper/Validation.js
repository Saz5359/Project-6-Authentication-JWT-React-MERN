//Validate user input for the sign up/ register component
export default function Validation(name, email, password, org_unit, division) {
  //store all errors
  const errors = {};

  //check if string is a valid email
  const email_pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //password must contain at least one digit one lower one upper and min lenth is 8
  const password_pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;

  //if no name was provided
  if (!name) {
    errors.name = " Name is Required";
    errors.error = true;
  }

  //if no email was provided
  if (!email) {
    errors.email = "Email is Required";
    errors.error = true;
  } //check if provided string is a email
  else if (!email_pattern.test(String(email).toLowerCase())) {
    errors.email = "Email is not Valid";
    errors.error = true;
  }

  //if no email was provided
  if (!password) {
    errors.password = "Password is Required";
    errors.error = true;
  } //if provided string is a valid password
  else if (!password_pattern.test(password)) {
    errors.password =
      "Password must contain at least 1 digit, one lowercase ,one Uppercase letter and must be at least 8 characters long";
    errors.error = true;
  }

  //if org unit was not provided
  if (!org_unit) {
    errors.org_unit = "Org Unit is Required";
    errors.error = true;
  }

  //if division was not provided
  if (!division) {
    errors.division = "Division is Required";
    errors.error = true;
  }

  return errors;
}
