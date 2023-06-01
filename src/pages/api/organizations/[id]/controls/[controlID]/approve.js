import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function users(req, res) {
    const {accessToken } = await getAccessToken(req, res);
    const response = await fetch(`http://localhost:8080/api/v1/nist_control/confirm_nist_compliance/${encodeURIComponent(req.query.controlID)}`, {
      method: req.method,
      
    headers: {
      Authorization: `Bearer ${accessToken}`,
      
    }
  });
  
  res.status(response.status).send(response.text())
})