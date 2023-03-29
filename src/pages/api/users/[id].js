import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function users(req, res) {
    const {accessToken } = await getAccessToken(req, res);
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    const response = await fetch(`http://localhost:8080/api/users/${req.query.id}`, {
     body: JSON.stringify(req.body),
     method: req.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
  
  res.status(response.status);//.json(response.json());
})