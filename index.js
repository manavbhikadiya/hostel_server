const express = require("express");
const cors = require('cors');
const router = require("./router/index")
const bodyParser = require('body-parser')
const createUser = require('./router/userRouter')
const addingHostel = require('./router/addHostel')
const collegeRouter = require('./router/collegeRouter')
const db = require("./db/db");

const app = express();
const PORT = 8000 || process.env.PORT;

app.use(cors());

app.use(express.json({ limit : "100mb"}));
app.use(express.urlencoded({ extended: false}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))


app.use('/user', createUser);
app.use('/college', collegeRouter)
app.use("/hostel", addingHostel)
app.use(router);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
