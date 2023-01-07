const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers/");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./middleware/passport");
// const passport = require("passport");

app.use(session({ secret: "mySecretKey" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(require("flash")());
app.use(express.json()); // instead for body-parser
// app.use(bodyParser.json()); // to support JSON-encoded bodie
app.use(bodyParser.urlencoded({ extended: true }));

// Setup view engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// connect database (MongoDB)
const db = require("../src/config/db"); // MongoDB database
db.connect();

// Use static files (css, js, ...)
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", router);

app.listen(port, () => console.log("Server listening on port 3000"));

module.exports = app;
