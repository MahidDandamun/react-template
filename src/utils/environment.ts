const version = 'v1';

const apiBaseUrl = process.env.REACT_APP_ENV === 'local' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_API_URL;

const uri = `${apiBaseUrl}/api`;

export const environment = {
  API: {
    uri,
    version
  }
};
