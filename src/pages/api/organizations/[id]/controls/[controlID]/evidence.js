import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { IncomingForm } from "formidable";
import { createReadStream } from 'fs';
import FormData from "form-data";

export default withApiAuthRequired(async function users(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const endpoint =
    `http://localhost:8080/organizations/${encodeURIComponent(req.query.id)}/nist_control/get/${encodeURIComponent(req.query.controlID)}/evidence`;
  if (req.method === 'POST') {

    try {





      const response = await fetch(endpoint, {
        method: 'POST', body: req.body, headers: {
          Authorization: `Bearer ${accessToken}`,
         "Content-Type": `multipart/form-data; boundary`
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
