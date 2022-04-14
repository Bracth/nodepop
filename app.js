var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerMiddleware = require("./lib/swaggerMiddleware");
const i18n = require("./lib/i18nConfigure");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

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

app.use("/api/anuncios", require("./routes/api/anuncios"));

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

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
