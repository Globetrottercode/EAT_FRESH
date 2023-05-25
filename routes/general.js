const express = require("express");
const public_users = express.Router();
const User = require("../model/users").User;
const passport = require("passport");

public_users.post("/signup", async (req, res) => {
  console.log("signup route", req.body);
  console.log(req.body);
  User.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.json({ message: err.message, success: false });
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("hellosss");
          console.log(req.user);
          res.redirect("/successregister");
        });
      }
    }
  );
});

public_users.get("/", (req, res) => {
  res.json({ a: "hello" });
});

public_users.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

public_users.get("/successregister", (req, res) => {
  res.status(200).json({
    message: "User registered",
    success: true,
  });
});

public_users.get("/failregister", (req, res) => {
  res.status(200).json({
    message: "User not registered",
    success: false,
  });
});

public_users.get(
  "/auth/google/plans",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/plans",
    failureRedirect: "/failregister",
  }),
  (req, res) => {
    res.status(200).json({
      message: "User registered",
      success: true,
    });
  }
);

module.exports.general = public_users;

// city , state , pincode , floor(optional) , landmark , detailed
