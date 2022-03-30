const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  favHostels: [
    {
      college_id: {
        type: String,
      },
      hostel_id: {
        type: String,
      },
    },
  ],
  profile: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userSchema.methods.addFavouriteHostel = async function (hostel_id, college_id) {
  try {
    this.favHostels = this.favHostels.concat({ college_id, hostel_id });
    await this.save();
    return this.favHostels;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
