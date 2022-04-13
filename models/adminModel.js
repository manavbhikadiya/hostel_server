const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  college_id: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

adminSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "manav");
    this.tokens = await this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
