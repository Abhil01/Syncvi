import { useState, useRef, useEffect } from 'react';
import styles from './Room.module.css';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { removeData } from '../../utils/userSlice';
import { removeRoomData } from '../../utils/roomSlice';
import {io} from 'socket.io-client';

const Room = () => {


  const socket = io('http://localhost:3001',{
      reconnection:false
    });
  
  const [videoURL, setVideoURL] = useState(null);
  const [error,setError] = useState("");
   const videoRef = useRef(null);
 
  const {id} = useParams();
    const roomID =id;
  const dispatch =useDispatch();
  // console.log(id);


  const {usernameapi,
          emailIdapi,
          passwordapi} = useSelector((store)=>store.user);
  

  useEffect(()=>{
    
    

    socket.on('connect',()=>{
    console.log('Client side socket');
    })

    socket.emit('join',{roomID,usernameapi});

    socket.on('play',()=>{
         videoRef.current?.play();
    })


    socket.on('pause',()=>{
         videoRef.current?.pause();
    })

    socket.on('reset',()=>{
      if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    })
    
    socket.on('forward',({ct})=>{
          if (videoRef.current) {
      videoRef.current.currentTime = ct;
    }
    })

    socket.on('backward',({ct})=>{
      if (videoRef.current) {
      videoRef.current.currentTime = ct;
    }
    })

    socket.on('disconnect',()=>{
      console.log('Client disconnect');
    })

  },[])

  





  useEffect(()=>{
      const getdetail = async()=>{
        try{
             const res = await axios('http://localhost:3030/room',{withCredentials:true});
             setError("");
        }
        catch(err){
          setError("User Not Logged in Please first Login");
        }
      }
      getdetail();
  },[])

  



 
  const navigate = useNavigate();
  const{creater,roomid} =useSelector((store)=>store.room);

  
  
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoSrc = URL.createObjectURL(file);
      setVideoURL(videoSrc);
    }
  };

   const handlePlay = () => 
    { 
      videoRef.current?.play();
      socket.emit('play',{roomID});
    }
  const handlePause = () => 
  {
    videoRef.current?.pause();
    socket.emit('pause',{roomID});
  }

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    socket.emit('reset',{roomID});
  };

  const handleForward = () => {
    let ct;
    if (videoRef.current) {
     ct = videoRef.current.currentTime + 10;
    //  console.log(ct);
     videoRef.current.currentTime=ct;
    }
    socket.emit('forward',{roomID,ct});
  };

  const handleBackward = () => {
    let ct;
    if (videoRef.current) {
     ct = videoRef.current.currentTime - 10;
    //  console.log(ct);
     videoRef.current.currentTime=ct;
    }
    socket.emit('backward',{roomID,ct});
  };

  const handleLogout = async()=>{
        try{
          const res = await axios('http://localhost:3030/logout',{withCredentials:true});
          window.alert("Logged out");
          dispatch(removeData());
          navigate('/');
        }
        catch(err){
            console.log(err.message);
        }
     } 

if(error)
    {
        return(<p style={{color:'red'}}>Error:{error}</p>);
    }
 
 

  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={handleLogout} >Logout</button>

      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Room Dashboard</h1>
          <div className={styles.roomInfo}>
            <p>Created by: <strong>{creater}</strong></p>
            <p>Room ID: <code>{roomID}</code></p>
          </div>
        </header>

        <div className={styles.uploadSection}>
          <label className={styles.label}>Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className={styles.fileInput}
          />
        </div>

        {videoURL && (
          <div className={styles.videoContainer}>
            <video ref={videoRef} src={videoURL} className={styles.video} />
          </div>
        )}

        <div className={styles.controls}>
          <button onClick={handleBackward} className={styles.button}>⏪ 10s</button>
          <button onClick={handlePlay} className={styles.button}>Play</button>
          <button onClick={handlePause} className={styles.button}>Pause</button>
          <button onClick={handleReset} className={styles.button}>Reset</button>
          <button onClick={handleForward} className={styles.button}>10s ⏩</button>
        </div>
      </div>
    </div>
  );
}
export default Room;