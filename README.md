# Cool Locker

Developed and implemented an authenticated internal web application for credential management, tailored for businesses operating across multiple online platforms. This solution provides a secure repository for platform credentials for a range of destinations such as WordPress sites, servers, and financial accounts

## Task at hand
Cool Tech faced the challenge of efficiently managing login credentials across various platforms including WordPress sites, servers, and financial accounts. Due to the sensitive nature of these credentials, ensuring  authentication was important. Additionally, with the utilization of multiple WordPress and custom sites, the manual management of login details has become burdensome and error-prone. Recognizing this challenge, I was tasked with developing an internal web application for credential management. This solution needed to include user login and registration functionalities, distinct user roles, and tailored resource access for each user to streamline the management process and enhance security. Through careful design and implementation, I successfully created a comprehensive web application that addressed Cool Tech's credential management challenges effectively.

## Features

- User login and registration endpoints which provide a JWT upon success to ensure users only get access to resources based on their roles.
- The app verifies the JWT and user permissions before providing access.
- Different user roles for the employees (Normal, Management, and Admin) determine their access to resources:

  - Normal users can read the credential repository, and add new credentials.
  - Management users can do the above plus update credentials.
  - Admin users can do the above plus they can change the user role of any user.

- This app was created using the following:
  - React.js - Frontend
  - Express.js - Backend
  - Node.js - Backend
  - MongoDB - Database
  - Mongoose - Backend
  - JWT - JSON Web Token - Frontend/Backend
  - MERN Stack

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

  here are some login details:
  Admin - email: sam@gmail.com  password: Sam123
  Manager - email: alex@gmail.com  password: Alex123
  Normal - register yourself
