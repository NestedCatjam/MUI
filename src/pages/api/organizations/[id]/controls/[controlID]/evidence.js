import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createReadStream } from 'fs';

export default withApiAuthRequired(async function users(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const endpoint =
    `http://localhost:8080/organizations/${encodeURIComponent(req.query.id)}/nist_control/get/${encodeURIComponent(req.query.controlID)}/evidence`;
  if (req.method === 'POST') {
    const file = req.files.file;
    try {
      const formData = new FormData();

      formData.append('file', createReadStream(file.path));
      const response = await fetch(endpoint, {
        method: 'POST', body: formData, headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        const errorMessage = await response.text();
        res.status(response.status).send(errorMessage);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while uploading the file.');
    } finally {
      file.stream.cancel();
    }

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
