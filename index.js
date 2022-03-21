const express = require("express");
const cors = require('cors');
const router = require("./router/index")
const db = require("./db/db");

const app = express();
const PORT = 8000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
