# Serverless Todo application - Frontend

4th project to Udacity Cloud Developer Nanodegree

This is the frontend for the serverless todo application by Udacity. The application NOT made by me, this is for reference so the serverless app easily can tested.

## [The backend is here](https://github.com/Dhadhazi/udacity-serverless-todo-backend)

## Setup

The `client` folder contains a web application that can use the API that should be developed in the project.

This frontend should work with your serverless application once it is developed, you don't need to make any changes to the code. The only file that you need to edit is the `config.ts` file in the `client` folder. This file configures your client application just as it was done in the course and contains an API endpoint and Auth0 configuration:

```ts
const apiId = '...' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: '...',    // Domain from Auth0
  clientId: '...',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}
```
