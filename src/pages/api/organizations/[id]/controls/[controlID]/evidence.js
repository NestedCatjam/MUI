import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function users(req, res) {
    const {accessToken } = await getAccessToken(req, res);
    const response = await fetch(`http://localhost:8080/`, {
      method: req.method,
      body: JSON.stringify(req.method !== 'GET' ? req.body: {}),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': req.method !== 'GET' ? 'application/json; charset=UTF-8' : undefined,
    }
  });
  
  res.status(response.status).send(response.text())
})