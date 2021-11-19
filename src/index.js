const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("halo");
});

app.listen(3333, () => {
  console.log("app listening on port 3333");
});
