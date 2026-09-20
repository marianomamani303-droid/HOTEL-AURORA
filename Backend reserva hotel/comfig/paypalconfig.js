import {
  Client,
  Environment
} from "@paypal/paypal-server-sdk"

const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET
  },
  environment: Environment.Sandbox
})

export default paypalClient