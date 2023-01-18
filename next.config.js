const restServiceDevUrl = 'http://localhost:8080';

const authenticationServerDevUrl = 'http://localhost:8080';

const rewrites = async () => [
  
  { source: "/api/v1/registration", destination: `${authenticationServerDevUrl}/api/v1/registration`}
]
module.exports = {
  reactStrictMode: true,
  rewrites
};
