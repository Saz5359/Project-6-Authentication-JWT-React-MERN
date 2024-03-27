import React from "react";

function NoAccess() {
  return (
    /* This is displayed when the user does not have access to the resource */
    <div className="error">
      <div>
        <h2 className="error-face">
          <box-icon
            type="solid"
            name="user-x"
            size="lg"
            color="#ffffff"
          ></box-icon>
        </h2>
        <h2>You do not have Access to this Resource</h2>
      </div>
    </div>
  );
}

export default NoAccess;
