const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const app = express();
const instance_locator_id = "a206a4ab-c990-4d3e-b230-71c7fda5c174";
const chatkit_secret = "eee30890-8f43-4b2a-be8a-5b072e518173:U/BE9D9sHidPLIJgMtdPQ6xPJk4hpVkuKhSOD1MV2No=";

const chatkit = new Chatkit.default({
  instanceLocator: `v1:us1:${instance_locator_id}`,
  key: chatkit_secret
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("all green!");
});

app.post("/users", (req, res) => {
  const { username } = req.body;

  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        let statusCode = error.status;
        if (statusCode >= 100 && statusCode < 600) {
          res.status(statusCode);
        } else {
          res.status(500);
        }
      }
    });
});

const PORT = 3000;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on ports ${PORT}`);
  }
});
