const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const ConversationRoute = require("./routes/conversation");
const MessageRoute = require("./routes/message");

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("db connected")
);

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/conversation", ConversationRoute);
app.use("/api/message", MessageRoute);

app.get("/", (req, res) => {
  res.send("halo");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
