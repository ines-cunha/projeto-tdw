const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get ("/", (rep, res) => { res.send("ola Mundo") });
app.listen(port, () => console.log("alo"));

