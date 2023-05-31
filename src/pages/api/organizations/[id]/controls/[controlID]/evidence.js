import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createReadStream } from 'fs';


export default withApiAuthRequired(async function users(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const endpoint =
    `http://localhost:8080/organizations/${encodeURIComponent(req.query.id)}/nist_control/get/${encodeURIComponent(req.query.controlID)}/evidence`;
  if (req.method === 'POST') {
    console.log(req.body)
    const response = await fetch(endpoint, {method: 'POST', body: req, headers: {Authorization: `Bearer ${accessToken}`, "Content-Type" : req.headers["content-type"]}});
    res.redirect(302, "/evidence");
    //res.status(response.status).send(await response.text());
  } else {


    const response = await fetch(endpoint, {
      method: req.method,
      body: (req.method !== 'GET' ? JSON.stringify(req.body) : undefined),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': req.method !== 'GET' ? 'application/json; charset=UTF-8' : undefined,
      }
    });

    res.status(response.status).json(await response.json())
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}