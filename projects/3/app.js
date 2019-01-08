const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config");
const mongoose = require("mongoose");
const staticAsset = require('static-asset');
const routes = require('./routes');


mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });
mongoose.connect(config.MONGO_URL, { useMongoClient: true });


const app = express();
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticAsset(path.join(__dirname, 'dist')));
app.use(staticAsset(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "views")));
app.use(
  "script",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

app.get('/', (req, res) => {
  res.render('index');
});
app.use('/api/auth', routes.auth);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {}
  });

});

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
);