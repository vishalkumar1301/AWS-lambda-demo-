import pkg from 'aws-sdk';
const { AWS } = pkg;

export const handler = async (event) => {
  // Set the region where your user pool is located
  AWS.config.region = 'us-east-2';

  // Create a new Cognito client
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  // Set the parameters for the sign-up request
  const params = {
    ClientId: '3sbsnitb9jh7gjo6sv16c9n4gm',
    Password: event.body.password,
    UserAttributes: [
      {
        Name: 'email',
        Value: event.body.email
      },
      {
        Name: 'phone_number',
        Value: event.body.phoneNumber
      }
    ],
    Username: event.body.username
  };

  try {
    // Call the sign-up method
    const signUpResponse = await cognitoIdentityServiceProvider.signUp(params).promise();
    console.log(signUpResponse);

    // Return a success message
    return {
      statusCode: 200,
      body: 'Sign-up successful'
    };
  } catch (error) {
    console.error(error);

    // Return an error message
    return {
      statusCode: 500,
      body: 'Sign-up failed'
    };
  }
};
