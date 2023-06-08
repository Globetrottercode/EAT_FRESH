const express = require("express");
const regd_users = express.Router();
const passport = require("passport");
const User = require("../model/users").User;
const jwt = require("jsonwebtoken");

let username;
let jwtSecret = process.env.JWT_SECRET;

regd_users.post("/login", async (req, res) => {
  console.log("login route", req.body);
  username = req.body.username;
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/customer/failedlogin");
    } else {
      console.log("hel");
      passport.authenticate("local")(req, res, function () {
        res.redirect("/customer/successlogin");
      });
    }
  });
});

regd_users.get("/successlogin", async (req, res) => {
  let data = {
    username: username,
  };
  let accessToken = jwt.sign(data, jwtSecret);
  res
    .status(200)
    .json({ message: "User logged in", success: true, authToken: accessToken });
});

regd_users.get("/failedlogin", async (req, res) => {
  console.log("not reached");
  res.status(401).json({ message: "User log in failed", success: false });
});

regd_users.get("/getUsers/:username", async (req, res) => {
  let username = req.params.username;
  let result = await User.find({ username: username });
  res.json(result);
});

regd_users.put("/updateName", async (req, res) => {
  let { name, username } = req.body;
  await User.findOneAndUpdate({ username: username }, { name: name });
  let response = await User.find({ username: username });
  res.status(200).json(response);
});

regd_users.put("/updateEmail", async (req, res) => {
  let { email, username } = req.body;
  await User.findOneAndUpdate({ username: username }, { username: email });
  let response = await User.find({ username: email });
  res.status(200).json(response);
});

regd_users.post("/changepassword", function (req, res) {
  User.findByUsername(req.body.username, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      user.changePassword(
        req.body.oldPassword,
        req.body.newPassword,
        function (err) {
          if (err) {
            res.json(err);
          } else {
            res.status(200).json({ message: "successfully changed password" });
          }
        }
      );
    }
  });
});

module.exports.authenticated = regd_users;
