const express = require("express");
require("express-async-errors");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
var cors = require("cors");
app.use(cors());

//database connection
require("./mongo");
require("./model/Post");
require("./model/Comment");
require("./model/Like");
require("./model/User");
app.use(bodyParser.json());
app.use(morgan());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

/*Not Found Route*/

app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

//Error handler
if (app.get("env") === "blogion") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message
    //    stack : error.stack
  });
});

const port = process.env.PORT || 4600;
app.listen(port, (req, res) => {
  console.log(`RUNNING on port ${port}`);
});
