const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const { exists } = require("../models/User");
const  fetchUser = require("../miidleware/fetchUser");
const JWT_TOKEN = "obaidurrehmanauthen";
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,error: "please find another email this email is already in used",
        });
      }
      let salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwtToken.sign(data, JWT_TOKEN);
      success= true;
      res.json({ success,jwtData });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("some error occurred");
    }
  }
);

// login endpoint
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blanked").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
        success = false;
        return res
          .status(500)
          .json({ error: "please try to login with correct credentials" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      console.log(passCompare)
      if (!passCompare) {
        success = false;
        return res
          .status(500)
          .json({error: "please try to login with correct credentials" });
      }
      const payloadData = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwtToken.sign(payloadData, JWT_TOKEN);
      success = true;
      res.json({success,jwtData});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server occurred");
    }
  }
);

//login user detail
router.post("/getUser",fetchUser,async (req, res) => {
    try{
      let userID = req.user.id;
      let userDetails = await User.findById(userID).select("-password")
      res.send(userDetails);
    }catch (error) {
      console.log(error.message);
      res.status(500).send("internal server occurred");
    }
  })

module.exports = router;
