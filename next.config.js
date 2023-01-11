const rewrites = async () => [
  { source: "/api/users", destination: "http://localhost:8080/users/" }
]
module.exports = {
  reactStrictMode: true,
  rewrites
};
