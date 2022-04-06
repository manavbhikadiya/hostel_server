const Admin = require("../models/adminModel");

exports.registerAdmin = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    res.status(404).send({ message: "Every field is mandatory" });
  }

  try {
    const createAdmin = new Admin({ name, email, username, password });
    await createAdmin.save();

    if (createAdmin) {
      res.status(201).send({ message: "Admin created" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
exports.loginAdmin = async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).send({ message: "Every field is mandatory" });
  }
  try {

    const adminExist  = await Admin.find({username:username,password:password});
    if(adminExist.length < 2 && adminExist.length != 0){
        res.status(200).send({message:"Logged in successfully"});
    }else{
        res.status(404).send({message:"username or password is wrong"});
    }

  } catch (error) {
      res.status(400).send({message:error})
  }
};
