import * as Updates from 'expo-updates';

const ENV = {
  dev: {
    env: "dev",
    APOLLO_URI: 'http://192.168.38.169:5000/graphql'
  },
  staging: {
    env: "staging"
  },
  production: {
    env: "production"
  },
};

const getEnvVars = () => {

  if (Updates.releaseChannel.startsWith('prod')) {
    // matches prod-v1, prod-v2, prod-v3
    return ENV.production; // prod env settings
  } else if (Updates.releaseChannel.startsWith('staging')) {
    // matches staging-v1, staging-v2
    return ENV.staging; // stage env settings
  } else {
    return ENV.dev; // dev env settings
  }
  // eslint-disable-next-line no-undef
  
};

export default getEnvVars;