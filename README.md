

<h1> Serverless TODO Web Application </h1>
<p>
This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.
</p>

<h1> Frontend </h1>

<p>
  React Client is attached to a serverless Backend deployed on AWS.
  request are made through the API gateway.
</p>


<H2>Backend</h2>

<p>
To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```
<p>

<H2>Front-End</h2>

<p>
To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```
</p>
