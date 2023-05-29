const express = require("express");
const creditRouter = express.Router();
const Credit = require("../model/credits").Credit;

let username;

creditRouter.post("/", async (req, res) => {
  // creating credits for a user
  const { username, credits } = req.body;
  if (username && saveAs) {
    let newCredit = new Credit();
    newCredit.username = username;
    newCredit.credits = credits;
    let response = await newCredit.save();
    res.status(200).json({ address: response, success: true });
  } else {
    res.status(400).json({ message: "Missing required field" });
  }
});

creditRouter.post("/getCredits", async (req, res) => {
  username = req.body.username;
  res.redirect("/customer/credits/getCredits");
});

creditRouter.get("/getCredits", async (req, res) => {
  let data = await Address.find({ username: username });
  if (data[0]) {
    res.json(data);
  } else {
    res.json({ message: "User has no saved credits" });
  }
});

module.exports.creditRouter = creditRouter;
