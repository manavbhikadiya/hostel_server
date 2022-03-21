const Hostel = require("../models/hostelModel");
const User = require("../models/userModel");

const getAllHostels = (req, res) => {
  Hostel.find()
    .then((hostels) => {
      res.send(hostels);
    })
    .catch(() => {
      res.status(404).send({ message: "Unable to find" });
    });
};

const getFavouriteHostels = (req, res) => {
  const user_id = req.params.user_id;
  User.find({ _id: user_id })
    .then((user) => {
      const hostels = user[0].favHostels;
      hostels.map((val) => {
        Hostel.find({ _id: val.college_id })
          .then((favHostel) => {
            res.send(favHostel);
          })
          .catch(() => {
            res.status(404).send({ message: "Favourite Hostel Not found" });
          });
      });
    })
    .catch(() => {
      res.status(404).send({ message: "Favourite Hostel not found" });
    });
};

const getHostelDetails = (req, res) => {
    const college_id = req.params.college_id;
    const hostel_id = req.params.hostel_id;
    Hostel.findOne({_id:college_id})
    .then((colleges) => {
     colleges.hostels.map((val)=>{
         if(val._id == hostel_id){
             res.send(val);
         }
     })
    })
    .catch(() => {
      res.status(404).send({ message: "Unable to find" });
    });
};

module.exports = { getAllHostels, getFavouriteHostels, getHostelDetails };
