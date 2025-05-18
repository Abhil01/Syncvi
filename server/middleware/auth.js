const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const Auth = async(req,res,next)=>{

    try{

        const {token} = req.cookies;
        // console.log(token);
        if(!token)
        {
            throw new Error("User not logged in");
        }

        const id = await jwt.verify(token,process.env.JWT_KEY);
        
       

        const query = await  User.findById(id);
        if(!query)
        {
            throw new Error("User not logged in");
        }

        req.user = query;
        next();

    }
    catch(err){
        next(err);
    }

}
module.exports = {Auth};