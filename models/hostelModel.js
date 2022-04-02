const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  college_name: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  hostels: [
    {
      boys: {
        type: Boolean,
      },
      girls: {
        type: Boolean,
      },
      hostel_name: {
        type: String,
      },
      manager_name: {
        type: String,
      },
      helpline_no: {
        type: Number,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      latitudeDelta: {
        type: Number,
      },
      longitudeDelta: {
        type: Number,
      },
      kms: {
        type: Number,
      },
      rooms_available: {
        type: Number,
      },
      room_price: {
        type: Number,
      },
      location: {
        type: String
      },
      hostel_image : {
        type : String
      }
    },
  ],
});

hostelSchema.methods.addHostels = async function (
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
) {
  try {
    this.hostels = this.hostels.concat({
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
    });
    await this.save();
    return this.hostels;
  } catch (error) {
    console.log(error);
  }
};

const Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;
