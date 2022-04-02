
const User = require('../models/userModel')
const fs = require('fs')

// create user
exports.createUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    res.status(404).send({ message: "Every field is mandatory" });
  }

  try {

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400).send({message:"Email already exist"});
    }

    const createUser = new User({ name, email, password, mobile });
    await createUser.save();
    if (createUser) {
      res.status(201).send(createUser);
    }
  } catch (error) {
    console.log(req.body);
    res.status(400).send({ message: error });
  }
}

// image uploding
exports.uploadProfileController = async (req, res) => {
  
  const id = req.params.id;

  // file uploding
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
  else {
    var err = {
      success: false,
      message: "File not upoload"
    }
    res.send(err)
  }

  const userFind = await User.findOne({ _id: id });
  try {
    if (userFind.id) {
      let newData = {
        profile: url
      }
      const user = await User.findByIdAndUpdate({ _id: id }, newData)
      await user.save()
      res.send({ success: true, message: "file url saved ...." })

    } else {
      res.send({ message: "id is wrong" })
    }
  }
  catch (error) {
    console.log(error);
    res.send({ error: error.message })
  }

}

// update user
exports.updateUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  if (req.file) {
    function base64_encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    }
    var base64Str = base64_encode(req.file.path)
    var url = `data:${req.file.mimetype};base64,${base64Str}`
  }

  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { email: email, name: name, password: password, mobile: mobile, profile: url } })
      .then((value) => {
        if (value) {
          res.send({ success: true, message: "User Updated" })
        } else {
          res.send({ success: false, message: "invalid user" })
        }
      })
      .catch(e => {
        res.send({ success: false, err: "invalid id" })
      })
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id })
      .then((value) => {
        console.log(value);
        if (value) {

          res.send({ success: true, message: "User Updated" })
        } else {
          res.send({ success: false, message: "invalid user" })
        }
      })
      .catch(e => {
        res.send({ success: false, err: "invalid id" })
      })
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}