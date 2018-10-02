const express = require("express");
const log = require("./logger");
const cp = require("cookie-parser");
const bp = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

const port = process.env.PORT || 3000;
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.DB_URL || "localhost";
const dbCollection = process.env.DB_COLLECTION || "nodebook";
////Need to add database user and collection information for the connection.
mongoose
  .connect(`mongodb://${dbUrl}:${dbPort}/${dbCollection}`)
  .then(() => log.info(`Connected Successfully to MongoDB`))
  .catch(err => log.error(err));

app.use(passport.initialize());

require("./passport-config")(passport);

app.use(cp());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use((res, req, next) => {
  if (req.body) log.info(req.body);
  if (req.query) log.info(req.query);
  if (req.params) log.info(req.params);
  log.info(`Recieved a ${req.method} request from ${req.ip} for ${req.url}`);
  next();
});

app.listen(port, err => {
  if (err) log.error(err);
  log.info(`Listening for Requests on Port: ${port}.`);
});
