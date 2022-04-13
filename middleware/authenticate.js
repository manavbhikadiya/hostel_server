const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const authenticate = async (req, res, next) => {
    try {
        
        const token  = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, 'manav');

        const rootAdmin = await Admin.findOne({_id:verifytoken._id, "tokens.token":token});

        if(!rootAdmin){
            throw new Error('user not found')
        }

        req.token = token;
        req.rootAdmin = rootAdmin; 
        req.userId = rootAdmin._id;
        next();
    } catch (error) {
        res.status(401).send({message:"Un Authorized: token expire"})
    }
};

module.exports = authenticate;
