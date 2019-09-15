const express = require('express');
const app = express();
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const LYRIC_API_KEY = "6958fd567c7036e0ea5f372063e47980";
const port = 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/emojitext', (req, res) => {
    console.log(req.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
