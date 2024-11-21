const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

const HUBSPOT_REDIRECT_URI = "http://localhost:3000/api/auth";
const HUBSPOT_CLIENT_ID = "25c61556-2874-48f7-9cb0-692fb226ecb0";
const HUBSPOT_CLIENT_SECRET = "39ee22f3-f1c2-44e0-8e82-74db39f0da7a";

const URL =
  "https://app.hubspot.com/oauth/authorize?client_id=25c61556-2874-48f7-9cb0-692fb226ecb0&redirect_uri=http://localhost:3000/api/auth&scope=oauth%20crm.objects.contacts.read";

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home", { link: URL });
});

app.get("/api/auth", async (req, res) => {
  const code = req.query.code;

  const response = await axios(
    `https://api.hubapi.com/oauth/v1/token?grant_type=authorization_code&client_id=${HUBSPOT_CLIENT_ID}&redirect_uri=${HUBSPOT_REDIRECT_URI}&client_secret=${HUBSPOT_CLIENT_SECRET}&code=${code}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  res.render("account", { user: response.data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
