const multer = require("multer")
const path  = require("path")

const profileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/profile") )
    },
    filename :(req, file , cb)=> {
        cb(null, file.originalname)
    }
})

const hostelStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/hostel") )
    },
    filename :(req, file , cb)=> {
        cb(null, file.originalname)
    }
})
exports.uploadProfile = multer({storage : profileStorage})
exports.uploadHostel = multer({storage : hostelStorage})