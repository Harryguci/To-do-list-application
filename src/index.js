const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers/");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const db = require("../src/config/db"); // MongoDB database
db.connect();

app.use(express.static("./public"));
app.use("/", router);

app.listen(port, () => console.log("Server listening on port 3000"));
