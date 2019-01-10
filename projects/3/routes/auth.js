const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");

const models = require("../models");

// POST is authorized
router.post("/register", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  console.log(login + " " + password + " " + passwordConfirm);
  if (!login || !password || !passwordConfirm) {
    const fields = [];
    if (!login) {
      fields.push(login);
    }
    if (!password) {
      fields.push(password);
    }
    if (!login) {
      fields.push(passwordConfirm);
    }

    res.json({
      ok: false,
      error: "All fields must be done!",
      fields
    });
  } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
    res.js({
      ok: false,
      error:
        "There, in you login can be only latin symbols and standard numbers!",
      fields: ["login"]
    });
  } else if (login.length < 3 || login.length > 16) {
    res.json({
      ok: false,
      error: "Login length must be from 3 to 16 !",
      fields: ["login"]
    });
  } else if (password !== passwordConfirm) {
    res.json({
      ok: false,
      error: "Passwords not the same!",
      fields: ["password", "passwordConfirm"]
    });
  } else if (password.length < 3) {
    res.json({
      ok: false,
      error: "The minimum length of your password is 3!",
      fields: ["password"]
    });
  } else {
    models.User.findOne({
      login
    }).then(user => {
      if (!user) {
        bcrypt.hash(password, null, null, (err, hash) => {
          models.User.create({
            login,
            password: hash
          })
            .then(user => {
              console.log(user);
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok: true
              });
            })
            .catch(err => {
              console.log(err);
              res.json({
                ok: false,
                error: "Error, try later!"
              });
            });
        });
      } else {
        res.json({
          ok: false,
          error: "Name already used!",
          fields: ["login"]
        });
      }
    });
  }
});
router.post("/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  if (!login || !password) {
    const fields = [];
    if (!login) fields.push("login");
    if (!password) fields.push("password");

    res.json({
      ok: false,
      error: "All fields required!",
      fields
    });
  } else {
    models.User.findOne({
      login
    })
      .then(user => {
        if (!user) {
          res.json({
            ok: false,
            error: "Login and password isn't correct!",
            fields: ["login", "password"]
          });
        } else {
          bcrypt.compare(password, user.password, function(err, result) {
            if (!result) {
              res.json({
                ok: false,
                error: "Login and password isn't correct!",
                fields: ["login", "password"]
              });
            } else {
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok: true
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({

          ok: false,
          error: "Error, try again later!"
        });
      });
  }
});

// GET for logout
router.get("/logout", (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
