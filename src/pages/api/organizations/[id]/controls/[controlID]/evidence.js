import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const uniqueFilename = uuidv4();
      cb(null, uniqueFilename);
    },
  }),
});

export default withApiAuthRequired(async function users(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const endpoint = `http://localhost:8080/organizations/${encodeURIComponent(
    req.query.id
  )}/nist_control/get/${encodeURIComponent(
    req.query.controlID
  )}/evidence`;

  
  if (req.method === "POST") {
    try {
      console.log(endpoint);
      upload.single("file")(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(400)
            .send("An error occurred while uploading the file.");
        }

        const file = req.file;

        if (!file) {
          return res.status(400).send("No file was uploaded.");
        }try {
          const formData = new FormData();
          formData.append("file", file.buffer, { filename: file.originalname });

          const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (response.ok) {
            const data = await response.json();
            return res.status(200).json(data);
          } else {
            const errorMessage = await response.text();
            return res.status(response.status).send(errorMessage);
          }
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .send("An error occurred while uploading the file.");
        } finally {
          // You may not need to cancel the stream in this case
          // file.stream.cancel();
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("An error occurred while uploading the file.");
    }
  } else {
    const response = await fetch(endpoint, {
      method: req.method,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": req.method !== "GET" ? "application/json; charset=UTF-8" : undefined,
      },
    });

    return res.status(response.status).json(await response.json());
  }
});