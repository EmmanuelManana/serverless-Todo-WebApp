# Serverless TODO

This is the 4th Project for Udacity Cloud Develper Nanodegree.

This is mostly developed by me - from starter code - while the frontend by Udacity.

To implement this project, you need to implement a simple TODO application using AWS Lambda and Serverless framework.

## [The frontend is here](https://github.com/Dhadhazi/udacity-serverless-todo-frontend)

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.ts` file in the `client` folder. We recommend using asymmetrically encrypted JWT tokens.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.
