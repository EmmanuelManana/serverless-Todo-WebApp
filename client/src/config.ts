// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '0slt3kehpd'
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-1.amazonaws.com/dev`
//https://${apiId}.execute-api.eu-west-1.amazonaws.com/dev

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-7aw7hycc.eu.auth0.com', // Auth0 domain
  clientId: 'p2APpT52P5T1psaMIgw1J3vmOUswOw3b', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
