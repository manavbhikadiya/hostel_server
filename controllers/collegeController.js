const Admin = require('../models/adminModel');
const Hostel = require('../models/hostelModel')

exports.addCollege = async (req, res) => {
    const { college_name, district, location } = req.body;
    const admin_id = req.params.admin_id;
    if (!college_name || !district || !location) {
        res.status(404).send({ message: "Every field is mandatory" });
    }
    try {
        const addCollege = new Hostel({ college_name, district, location });
        await addCollege.save();

        if (addCollege) {
            await Admin.findByIdAndUpdate({_id:admin_id},{college_id:addCollege._id});
            res.status(201).send(addCollege);
        }
    } catch (error) {
        res.status(400).send({ message: error });
    }
}

exports.updateCollge = async (req, res) => {
    const id = req.params.id;

    const { college_name, district, location } = req.body

    let newData = {
        college_name: college_name,
        district: district,
        location: location
    }

    await Hostel.findByIdAndUpdate({ _id: id }, newData)
        .then(college => {
            if (college) {
                res.send({ success: true, message: "College updated" })
            } else {
                res.send({ success: false, message: "Invalid data" })
            }
        })
        .catch(e => {
            console.log(e);
            res.send({ success: false, err: e.message })
        })
}

exports.deleteCollege = async(req, res) => {                                               
    const id = req.params.id;
try {
    
    await Hostel.findByIdAndDelete({ _id: id })
        .then(college => {
            if (college) {
                res.send({ success: true, message: "College data deleted" })
            } else {
                res.send({ success: false, message: "Invalid data" })
            }
        })
        .catch(e => {
            console.log(e);
            res.send({ success: false, err: e.message })
        })
} catch (error) {
    console.log(error);
    res.send({success : false, err : "catch"})
}
}