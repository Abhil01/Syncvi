const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        minLength:1,
        maxLength:50,
        required:true
    },
    email:{
        type:String,
        minLength:1,
        maxLength:50,
        unique:true,
        required:true,
        validate(value)
        {
           if(!validator.isEmail(value))
           {
             throw new Error("Input Valid Mail");
           }
        }
    },
    password:{
        type:String,
        minLength:1,
        maxLength:50,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Make password Strong");
            }
        }
    }


},{timestamps:true}
)

const User = mongoose.model('User',UserSchema);
module.exports={User};