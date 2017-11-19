const express = require("express");
const fs = require("fs");
const request = require('request');
const http = require('https');

const allCoinsRoute = require('./routes/R-allcoins');
const histoDayRoute = require('./routes/R-histoday');
const coinSnap = require('./routes/R-coinsnap');
const exchangeList = require('./routes/R-exlist');
const basicQuery = require('./routes/R-basic');

const app = express();

require('dotenv').config()
app.set("port", process.env.PORT || 3001);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/api/exchanges/", exchangeList);
app.post("/api/coinlist/", allCoinsRoute);
app.post("/api/histoday/:combo", histoDayRoute);
app.post("/api/coinsnap/:coin1", coinSnap);
app.post("/api/basicquery/:query", basicQuery);

app.listen(app.get("port"), () => {
  console.log(`Find the BACK END server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
