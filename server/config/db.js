const mongoose = require('mongoose');

const Connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports = {Connect};