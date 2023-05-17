const express = require("express");
const port = 3000;
const handlebars = require("express-handlebars").engine;
const morgan = require("morgan");
const path = require("path");
const app = express();
const route = require("./routes");
const db = require("./config/db");
const bodyParser = require("body-parser");
const passport = require('passport');
const configurePassport = require('./middleware/passport');

app.use(passport.initialize());
configurePassport(passport);


//* create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//* Connect database
db.connect();

//*


//* HTTP Logger

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//*Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views/"));
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
