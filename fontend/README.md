# MERN STACK AUTHENTICATED APP

This app is an internal web app for credential management. Credentials are login details
(username & password) and can be for a variety of places in the app. The app has user login and registration, different user roles, and
different resource access for each user.

## Features

- login and registration endpoints which provide a JWT upon success to ensure users only get access to resources based on their roles.
- Different user roles for the employees (Normal, Management, and Admin):

  - Normal users can read the credential repository, and add new credentials in.
  - Management users can do the above plus update credentials.
  - Admin users can do the above plus they can change the user role of any user.

  ## Installation

- Clone project to a file
- Ensure the backend and frontend are cloned
- Run `npm install` in root directory to install `node modules `
- Run `npm start` in the root directory in the console and wait for the app to connect to the Database
- Run `cd frontend ` in the console to move to the frontend directory.
- Run `npm install` in the frontend directory to install `node modules `
- Run `npm start` in the frontend directory and the app will start at http://localhost:3000/

## Usage

- Register on the signup page with your details select an organizational unit and write a division for that unit
- Upon successful registration, the user is moved to the home page where you can view the credentials of all users in your division and organizational unit
- New users are assigned a 'Normal' role which can be changed by admin users.
- User roles, organizational units, and divisions can only be changed by Admin users.
- User role explained in Features section

## Future Improvements

- Update The Style of the home page
- Upgrade Admin page
- Improve success alerts to be user-friendly
