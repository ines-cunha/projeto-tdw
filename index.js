const express = require("express");
const App = express();
const port = 4000;

app.get ("/", (rep, res) => { res.send("ola Mundo") });
app.listen(port, () => console.log("alo"));

