const express = require("express");
const myPlan = express.Router();
const MyPlan = require("../model/myPlan").MyPlan;

module.exports.myPlan = myPlan;
