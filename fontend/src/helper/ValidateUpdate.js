//This function validates user input for the update credential
export default function ValidateUpdate(
  credentialToUpdate,
  toUpdate,
  valueToUpdate
) {
  //store all errors
  const errors = {};

  //checks if the string is an email
  const email_pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //password must contain at least one digit one lower one upper and min lenth is 8
  const password_pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;

  //if credentialToUpdate is empty
  if (!credentialToUpdate) {
    errors.user = "Select the credential you want to Update!";
    errors.error = true;
  }

  //if toUpdate is empty
  if (!toUpdate) {
    errors.field = "Select the field you want to Update!";
    errors.error = true;
  }

  //this statement is for the field that has been selected
  if (toUpdate === "name") {
    //if valueToUpdate is empty
    if (!valueToUpdate) {
      errors.name = " Name is Required";
      errors.error = true;
    }
  } else if (toUpdate === "email") {
    //if valueToUpdate is empty
    if (!valueToUpdate) {
      errors.email = "Email is Required";
      errors.error = true;
    } //check if provided email is a valid email
    else if (!email_pattern.test(String(valueToUpdate).toLowerCase())) {
      errors.email = "Email is not Valid";
      errors.error = true;
    }
  } else if (toUpdate === "password") {
    //if valueToUpdate is empty
    if (!valueToUpdate) {
      errors.password = "Password is Required";
      errors.error = true;
    } //test to see if password is valid
    else if (!password_pattern.test(valueToUpdate)) {
      errors.password =
        "Password must contain at least 1 digit, one lowercase ,one Uppercase letter and must be at least 8 characters long";
      errors.error = true;
    }
  }
  return errors;
}
