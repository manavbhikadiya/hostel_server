const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hostel')
.then(()=>{
    console.log("Database connection successfull");
})
.catch((e)=>{
    console.log(e);
})