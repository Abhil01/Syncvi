const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors =require('cors');


const app = express();
app.use(cors({
    origin:'http://localhost:1234',
    credentials:true,
}));


const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        methods:'*',
        credentials:true,
    }
})

io.on("connection",(socket)=>{
    // console.log('Client connected to backend');

    socket.on('join',({roomID,usernameapi})=>{
        socket.join(roomID);
        console.log(`${usernameapi} joined the room`);
    })


    socket.on('play',({roomID})=>{
        socket.to(roomID).emit('play');
    })

    socket.on('pause',({roomID})=>{
        socket.to(roomID).emit('pause');
    })
    
    
 
     socket.on('reset',({roomID})=>{
        socket.to(roomID).emit('reset');
    })

    socket.on('forward',({roomID,ct})=>{
        socket.to(roomID).emit('forward',{ct});
    })

    socket.on('backward',({roomID,ct})=>{
        socket.to(roomID).emit('backward',{ct});
    })
});

httpServer.listen(3001,()=>{
    console.log("Socket Server running at 3001");
})