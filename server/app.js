const express = require('express');
const {Connect} = require('./config/db');
const{User} = require('./models/User');
const {Room} = require('./models/Room');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const {Auth} = require('./middleware/auth');


require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookie());

app.use(cors({
    origin:'http://localhost:1234',
    credentials:true,
}));

app.post('/signup',async(req,res,next)=>{

     try{
        const{username,email,password} = req.body
        const data = {username,email,password}
        const user = new User(data);
        const query = await user.save();
        res.status(200).json({message:"User Added Successfully"});
     }
     catch(err){
        next(err);
     }

})


app.post('/login',async(req,res,next)=>{
    try{
          const{email,password} = req.body;
          
         const query = await User.findOne({email});
        
          if(!query)
          {
            throw new Error("Invalid Credentials");
          }
          if(!(password===query.password))
          {
            throw new Error("Invalid Credentials");
          }
          
          const id = query._id.toString();
          
          const token = await jwt.sign(id,process.env.JWT_KEY);
        //   console.log(token);

          res.cookie('token',token,{expires:new Date(Date.now()+24*60*60*1000)});//1 day
           
          res.status(200).send(query);

    }
    catch(err)
    {
        next(err);
    }
})

app.get('/logout',(req,res,next)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout Successfully"});
})


app.get('/select',Auth,(req,res,next)=>{
    try{
        res.status(200).json({message:"Valid User"});
    }
    catch(err){
        next(err);
    }
})

app.get('/room',Auth,(req,res,next)=>{
     try{
        res.status(200).json({message:"Valid User"});
    }
    catch(err){
        next(err);
    }
})


app.post('/createRoom',Auth, async(req,res,next)=>
{
      try{
         
        // console.log(req.user);
        // console.log(req.body);

        const{username} = req.user;
        const{create} = req.body;

        const data = {roomID:create,createdBy:username};
        const room = new Room(data);
        const query = await room.save();
        // console.log(query);
        res.status(200).send(query);

      }catch(err)
      {
        next(err);
      }  
});

app.post('/joinRoom',Auth, async(req,res,next)=>
{
      try{
         
        // console.log(req.user);
        // console.log(req.body);

        
        const{join} = req.body;
         const roomID = join;
        
        const query = await Room.findOne({roomID});
        if(!query)
        {
          throw new Error("Room not exist");
        }
       
        res.status(200).send(query);

      }catch(err)
      {
        next(err);
      }  
});




app.use("/",(err,req,res,next)=>{
   res.status(400).json({message:err.message});
})


Connect().then(()=>{
  try{
    app.listen(3030,()=>{
    console.log("Server Live at 3030");});
  }
  catch(err)
  {
     console.log(err.message);
  }
})

