const Hostel = require('../models/hostelModel')
var fs = require('fs');

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
    var fs = require('fs');
    function base64_encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    }
    var base64Str = base64_encode(req.file.path)
    // image url
    var url = `data:${req.file.mimetype};base64,${base64Str}`
  }
  const findCollege = await Hostel.findOne({ _id: college_id });
  let image = url
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
      image
    );
    res.status(201).send({ message: "Hostel Added" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

exports.updateHostel = async (req, res) => {
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
    location } = req.body

  if (req.file) {
    function base64_encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    }
    var base64Str = base64_encode(req.file.path)
    var url = `data:${req.file.mimetype};base64,${base64Str}`
  }

  let id = req.params.id;

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
    image: url
  }

  Hostel.update({ "hostels._id": id }, { "$set": { "hostels.$": newData } })
    .then(college => {
      if (college) {
        res.send({ success: true, message: "College updated", data: college })
      } else {
        res.send({ success: false, message: "Invalid data" })
      }
    })
    .catch(e => {
      console.log(e);
      res.send({ success: false, err: e.message })
    })
}

exports.removeHostel = async (req, res) => {
  const id = req.params.id
  Hostel.updateOne({ "hostels._id": id }, { "$pull": { "hostels": { "_id": id } } })
    .then(data => {
      res.send({ success: true, message: "hostel deleted" })
    })
    .catch(e => {
      console.log(e);
      res.send({ success: false, error: "error" })
    })
}