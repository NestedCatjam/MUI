import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function users(req, res) {
    const {accessToken } = await getAccessToken(req, res);
    const response = await fetch('http://localhost:8080/organizations/', {
      method: req.method,
      body: req.method !== 'GET' ? JSON.stringify(req.body): undefined,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': req.method !== 'GET' ? 'application/json; charset=UTF-8' : undefined,
    }
  });
  
  const organizations = await response.json();
  if (req.method === 'GET') {
    for (const organization of organizations) {
      const response = await fetch(`http://localhost:8080/organizations/${organization.id}/members/me/roles`, {headers:{Authorization: `Bearer ${accessToken}`}});
      const currentUserRoleInOrganization = await response.json();
      organization.myRoles = currentUserRoleInOrganization;
    }
  }
  res.status(response.status).json(organizations);
})