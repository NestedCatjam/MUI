import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function users(req, res) {
    const {accessToken } = await getAccessToken(req, res);
    const response = await fetch('http://localhost:8080/users', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const users = await response.json();
  res.status(200).json(users);
})