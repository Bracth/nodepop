var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerMiddleware = require("./lib/swaggerMiddleware");
const i18n = require("./lib/i18nConfigure");
const LoginController = require("./controller/loginController");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const jwtToken = require("./lib/jwtAuth");
const isAPIRequest = require("./lib/utils");

const dotenv = require("dotenv");
dotenv.config();

var app = express();

const loginController = new LoginController();

// Nos conectamos con MongoDB //

require("./lib/connectMongoose.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerMiddleware);

// Setup de i18n
app.use(i18n.init);

// Rutas del API //

app.post("/api/login", loginController.postJWT);
app.use("/api/anuncios", jwtToken, require("./routes/api/anuncios"));

// Rutas de mi website //

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/change-locale", require("./routes/change-locale"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // if we have an API error

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
