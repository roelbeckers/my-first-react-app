import { Amplify } from 'aws-amplify';

export const config = {
  Auth: {
    Cognito: {
      userPoolId: 'REGION_ABCDEFGHI',      // optional - Amazon Cognito User Pool ID
      userPoolClientId: 'ABCDEFGHIJKLMNO', // optional - Amazon Cognito Web Client ID
      identityPoolId: 'REGION:ABCDEFGHI'   // optional - Amazon Cognito Identity Pool ID
    }
  }
};

Amplify.configure(config);
