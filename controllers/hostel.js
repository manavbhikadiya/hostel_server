const Hostel = require('../models/hostelModel')

exports.hostelController = async (req, res) => {
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
    // function to encode file data to base64 encoded string
    function base64_encode(file) {
      // read binary data
      var bitmap = fs.readFileSync(file);
      // convert binary data to base64 encoded string
      return new Buffer(bitmap).toString('base64');
    }
    // base64 string
    var base64Str = base64_encode(req.file.path)

    // image url
    var url = `data:${req.file.mimetype};base64,${base64Str}`
  }
  // console.log(url);
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