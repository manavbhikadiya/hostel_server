const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Hostel = require("../models/hostelModel");
// const upload = require("../middleware/upload");
const nodemailer = require("nodemailer");
const controller = require("../controllers/hostelController");
const { uploadProfile } = require('../middleware/file')

const sendMail = (email, password) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "manavbhikadiya@gmail.com",
      pass: "6354327745",
    },
  });

  var mailOptions = {
    from: "manavbhikadiya@gmail.com",
    to: email,
    subject: "donot reply",
    text: `your pasword is ${password}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

router.post("/login/:email", async (req, res) => {
  const email = req.params.email;
  const { password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist.password == password) {
      res.status(200).send(userExist);
    } else {
      res.status(404).send({ message: "authentication failed" });
    }
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
});

router.post(
  "/addFavourite/:user_id/:hostel_id/:college_id",
  async (req, res) => {
    const user_id = req.params.user_id;
    const hostel_id = req.params.hostel_id;
    const college_id = req.params.college_id;

    const userFind = await User.findOne({ _id: user_id });

    try {
      const favHostel = await userFind.addFavouriteHostel(
        hostel_id,
        college_id
      );
      await favHostel.save();

      if (favHostel) {
        res.status(201).send({ message: "Added to favourite" });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
);


router.post("/forgotpassword/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    res.status(404).send({ message: "Email field is mandatory" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      sendMail(email, userExist.password);
      res.status(200).send({ message: "Password sent successfully" });
    } else {
      res.status(400).send({ message: "You have provide wrong email" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/hostels", controller.getAllHostels);
router.get("/getFavouritehostel/:user_id", controller.getFavouriteHostels);
router.get(
  "/getHostelDetails/:college_id/:hostel_id",
  controller.getHostelDetails
);
// file uploding


module.exports = router;
