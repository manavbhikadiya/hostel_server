const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Hostel = require("../models/hostelModel");
const upload = require("../middleware/upload");
const controller = require("../controllers/hostelController");

router.post("/user", async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    res.status(404).send({ message: "Every field is mandatory" });
  }

  try {
    const createUser = new User({ name, email, password, mobile });
    await createUser.save();
    if (createUser) {
      res.status(201).send({ message: "User created" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/login/:email", async (req, res) => {
  const email = req.params.email;
  const { password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist.password == password) {
      res.status(200).send({ message: "Logged in" });
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

router.post("/addCollege", async (req, res) => {
  const { college_name, district, location } = req.body;
  if (!college_name || !district || !location) {
    res.status(404).send({ message: "Every field is mandatory" });
  }
  try {
    const addCollege = new Hostel({ college_name, district, location });
    await addCollege.save();

    if (addCollege) {
      res.status(201).send({ message: "College created" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/addHostel/:college_id", async (req, res) => {
  const {
    boys,
    girls,
    hostel_name,
    manager_name,
    helpline_no,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    kms,
    rooms_available,
    room_price,
    location,
  } = req.body;

  const college_id = req.params.college_id;

  const findCollege = await Hostel.findOne({ _id: college_id });

  try {
    const addHostel = await findCollege.addHostels(
      boys,
      girls,
      hostel_name,
      manager_name,
      helpline_no,
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      kms,
      rooms_available,
      room_price,
      location,
    );
    await addHostel.save();

    res.status(201).send({ message: "Hostel Added" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/hostels", controller.getAllHostels);
router.get("/getFavouritehostel/:user_id", controller.getFavouriteHostels);
router.get('/getHostelDetails/:college_id/:hostel_id',controller.getHostelDetails);

module.exports = router;
