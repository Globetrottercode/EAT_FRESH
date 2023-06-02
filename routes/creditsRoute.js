const express = require("express");
const creditRouter = express.Router();
const Credit = require("../model/credits").Credit;

let username;

creditRouter.post("/createCredits", async (req, res) => {
  // creating credits for a user
  console.log("recieved request");
  const { username } = req.body;
  let newCredit = new Credit();
  newCredit.username = username;
  newCredit.credits = 0;
  await newCredit
    .save()
    .then((response) => {
      console.log("saved");
      res.status(200).json({ credits: response, success: true });
    })
    .catch((err) =>
      res.json({ err: err, message: "Credits exist for this username" })
    );
});

creditRouter.post("/getCredits", async (req, res) => {
  // storing username redirecting to getCredits route
  username = req.body.username;
  res.redirect("/customer/credits/getCredits");
});

creditRouter.get("/getCredits", async (req, res) => {
  // route for getting user credits
  let data = await Credit.find({ username: username });
  if (data[0]) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ message: "User has no saved credits" });
  }
});

creditRouter.put("/updateCredits", async (req, res) => {
  let { credits, username } = req.body;
  console.log(credits, username);
  await Credit.findOneAndUpdate({ username: username }, { credits: credits });
  let response = await Credit.find({ username: username });
  res.json(response);
});

module.exports.creditRouter = creditRouter;
