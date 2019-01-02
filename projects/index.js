const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const data = "smth";
let arr = ["Messages:"];

app.get("/", (req, res) => res.render("index", { data: data, arr: arr }));
app.get("/create", (req, res) => res.render("create"));
app.post("/create", (req, res) => {
  console.log(req.body);
  arr.push(JSON.stringify(req.body));
  res.redirect("/");
});
app.listen(3000, () => console.log(""));
