import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function users(req, res) {
    const {accessToken } = await getAccessToken(req, res);
    const response = await fetch(`http://localhost:8080/organization/${encodeURIComponent(req.query.id)}/nist_control/get/${encodeURIComponent(req.query.controlID)}/evidence`, {
      method: req.method,
      body: (req.method !== 'GET' ? JSON.stringify(req.body): undefined),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': req.method !== 'GET' ? 'application/json; charset=UTF-8' : undefined,
    }
  });

  res.status(response.status).send(response.text())
})
