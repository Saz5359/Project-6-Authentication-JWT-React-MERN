# Cool Locker

This app is an authenticated internal web app for credential management. Credentials are login details
(username & password) and can be for a variety of places — WP sites, servers, financial accounts, etc.. The app has user login and registration, different user roles, and different resource access for each user.

## Motivation

Cool tech has once again given me an important task. Cool tech makes use of multiple different WordPress sites as well as some custom ones. The task is to build a credential management web app to manage the credentials of all of their sites. The app should have user login and registration, different user roles, and different resource access for each user.

## Features

- User login and registration endpoints which provide a JWT upon success to ensure users only get access to resources based on their roles.
- The app verifies the JWT and user permissions before providing access.
- Different user roles for the employees (Normal, Management, and Admin) determine their access to resources:

  - Normal users can read the credential repository, and add new credentials in it.
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
