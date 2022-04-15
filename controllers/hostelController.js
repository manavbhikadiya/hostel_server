const Hostel = require("../models/hostelModel");
const User = require("../models/userModel");

var fs = require("fs");

exports.getAllHostels = async (req, res) => {
  Hostel.find()
    .then((hostels) => {
      res.send(hostels);
    })
    .catch(() => {
      res.status(404).send({ message: "Unable to find" });
    });
};

exports.getAllHostelsOfCollege = async (req, res) => {
  const college_id = req.params.college_id;
  Hostel.find({ _id: college_id })
    .then((hostels) => {
      res.send(hostels);
    })
    .catch(() => {
      res.status(404).send({ message: "Unable to find" });
    });
};

exports.getHostelDetails = async (req, res) => {
  const college_id = req.params.college_id;
  const hostel_id = req.params.hostel_id;
  Hostel.findOne({ _id: college_id })
    .then((colleges) => {
      colleges.hostels.map((val) => {
        if (val._id == hostel_id) {
          res.send(val);
        }
      });
    })
    .catch(() => {
      res.status(404).send({ message: "Unable to find" });
    });
};

exports.getFavouriteHostels = async (req, res) => {
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

exports.addHostel = async (req, res) => {
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

  if (req.file) {
    var fs = require("fs");
    function base64_encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString("base64");
    }
    var base64Str = base64_encode(req.file.path);
    // image url
    var url = `data:${req.file.mimetype};base64,${base64Str}`;
  }
  const findCollege = await Hostel.findOne({ _id: college_id });
  let hostel_image = url;
  try {
    await findCollege.addHostels(
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
      hostel_image
    );
    res.status(201).send({ message: "Hostel Added" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.updateHostel = async (req, res) => {
  let id = req.params.id;
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

  if (req.file) {
    function base64_encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString("base64");
    }
    var base64Str = base64_encode(req.file.path);
    var url = `data:${req.file.mimetype};base64,${base64Str}`;
  }

  let newData = {
    boys: boys,
    girls: girls,
    hostel_name: hostel_name,
    manager_name: manager_name,
    helpline_no: helpline_no,
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
    kms: kms,
    rooms_available: rooms_available,
    room_price: room_price,
    location: location,
    _id: id,
    hostel_image: url,
  };

  if(!req.file){
    Hostel.update(
      { "hostels._id": id },
      {
        $set: {
          "hostels.$.boys": newData.boys,
          "hostels.$.girls": newData.girls,
          "hostels.$.hostel_name": newData.hostel_name,
          "hostels.$.manager_name": newData.manager_name,
          "hostels.$.helpline_no": newData.helpline_no,
          "hostels.$.latitude": newData.latitude,
          "hostels.$.longitude": newData.longitude,
          "hostels.$.kms": newData.kms,
          "hostels.$.rooms_available": newData.rooms_available,
          "hostels.$.room_price": newData.room_price,
          "hostels.$.location": newData.location,
          "hostels.$._id":id
        },
      }
    )
      .then((college) => {
        if (college) {
          res.send({ success: true, message: "College updated", data: college });
        } else {
          res.send({ success: false, message: "Invalid data" });
        }
      })
      .catch((e) => {
        console.log(e);
        res.send({ success: false, err: e.message });
      });
  }else{
    Hostel.update(
      { "hostels._id": id },
      {
        $set: {
          "hostels.$.boys": newData.boys,
          "hostels.$.girls": newData.girls,
          "hostels.$.hostel_name": newData.hostel_name,
          "hostels.$.manager_name": newData.manager_name,
          "hostels.$.helpline_no": newData.helpline_no,
          "hostels.$.latitude": newData.latitude,
          "hostels.$.longitude": newData.longitude,
          "hostels.$.kms": newData.kms,
          "hostels.$.rooms_available": newData.rooms_available,
          "hostels.$.room_price": newData.room_price,
          "hostels.$.location": newData.location,
          "hostels.$.hostel_image":newData.hostel_image,
          "hostels.$._id":id
        },
      }
    )
      .then((college) => {
        if (college) {
          res.send({ success: true, message: "College updated", data: college });
        } else {
          res.send({ success: false, message: "Invalid data" });
        }
      })
      .catch((e) => {
        console.log(e);
        res.send({ success: false, err: e.message });
      });
  }
};

exports.removeHostel = async (req, res) => {
  const id = req.params.id;
  Hostel.updateOne({ "hostels._id": id }, { $pull: { hostels: { _id: id } } })
    .then((data) => {
      res.send({ success: true, message: "hostel deleted" });
    })
    .catch((e) => {
      console.log(e);
      res.send({ success: false, error: "error" });
    });
};
