export default function ValidateUserUpdate(
  userToUpdate,
  fieldToUpdate,
  newValue
) {
  //store all errors
  const errors = {};

  if (!userToUpdate) {
    errors.user = " Select the user you want to update!";
    errors.error = true;
  }

  if (!fieldToUpdate) {
    errors.field = " Select the field you want to update!";
    errors.error = true;
  }

  if (fieldToUpdate === "org_unit") {
    //if valueToUpdate is empty
    if (!newValue) {
      errors.org_unit = " Org_unit is Required!";
      errors.error = true;
    }
  } else if (fieldToUpdate === "division") {
    //if valueToUpdate is empty
    if (!newValue) {
      errors.division = "Division is Required!";
      errors.error = true;
    }
  } else if (fieldToUpdate === "role") {
    //if valueToUpdate is empty
    if (!newValue) {
      errors.role = "User role Required!";
      errors.error = true;
    }
  }

  return errors;
}
