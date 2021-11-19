const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const AuthRoute = require("./routes/auth");

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("db connected")
);

app.use(express.json());

const port = process.env.PORT || 3333;

app.use("/api/auth", AuthRoute);

app.get("/", (req, res) => {
  res.send("halo");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
