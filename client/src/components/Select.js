import styles from './Select.module.css';
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router';
import{ useSelector ,useDispatch } from 'react-redux';

import axios from 'axios';
import { removeData } from '../../utils/userSlice';
import { addRoomData } from '../../utils/roomSlice'; 
const Select = ()=>{
      
   
     const add = new URL('../assets/add.svg',import.meta.url).href;
     const video = new URL('../assets/video.svg',import.meta.url).href;
     
     const[create,setCreate] = useState("");
     const[join,setJoin] = useState("");

     const [verifiederror,setVerifiedError] = useState("");
     const[error,setError] = useState("");
     const navigate = useNavigate();
     const {usernameapi,
        emailIdapi,
        passwordapi} = useSelector((store)=>store.user);

  
 
    const dispatch = useDispatch();

     useEffect(()=>{
         const getdetail = async()=>{
            try{
                const res = await axios("http://localhost:3030/select",{withCredentials:true});
                setVerifiedError("");
            }
            catch(err)
            {
                setVerifiedError("User Not Logged in Please first Login")
            }
         }
         getdetail();
     },[])
   


     const handlelogout = async()=>{
        try{
          const res = await axios('http://localhost:3030/logout',{withCredentials:true});
          dispatch(removeData());

        }
        catch(err){
            console.log(err.message);
        }
     }
     
     const handleCreateRoom = async()=>{
         setError("");
          try{
                if(!create)
                {
                    setError("Enter Room ID");
                    throw new Error("Enter Room ID")
                }

                 const res =await axios.post('http://localhost:3030/createRoom',{create},{withCredentials:true});
                 
                dispatch(addRoomData({creater:usernameapi,roomid:create}));
               


                 navigate('/room/'+create);
                  
          }catch(err){
            if(err)
            console.log(err);
          }
     }

     const handleJoinRoom = async()=>{
        setError("");
          try{
                if(!join)
                {
                    setError("Enter Room ID");
                    throw new Error("Enter Room ID")
                }

                 const res = await axios.post('http://localhost:3030/joinRoom',{join},{withCredentials:true});

                //  console.log(res);

                 const{createdBy,roomID} = res?.data;

                 const creater= createdBy;
                 const roomid=roomID; 
                 dispatch(addRoomData({creater,roomid}));
                //   console.log(createdBy,roomID);

                 navigate('/room/'+join);
                  
          }catch(err){
            if(err){
            console.log(err.response.data.message)
            setError(err.response.data.message)}
            
          }

     }

    //   console.log(creater,roomid);
     const handleCreate = (e)=>{
        setCreate(e.target.value);
     }

     const handleJoin = (e)=>{
        setJoin(e.target.value);
     }
   
    if(verifiederror)
    {
        return(<p style={{color:'red'}}>Error:{verifiederror}</p>);
    }
 

    return(<>
    <div className={styles.page}>
         <div className={styles.header}>
         <div className={styles.username}><p>Hello {usernameapi}</p></div>
         <div >
                
                <Link to={"/"} className={styles.linkvalue} onClick={handlelogout}>Logout</Link>
        </div>
        </div>

        <div className={styles.headtext}>
                  <p>Create or Join<br></br>Room</p>
        </div>

        <div className={styles.status}> {error && (<p style={{color:'red'}}>Error:{error}</p>)}
        </div>

        <div className={styles.body}>
         
         <div className={styles.container}>
            
            <div className={styles.pic}>
            
                <img src={add}></img>
            
            </div>

            <div className={styles.context}>
              <p>Create Room</p>
            </div>

            <div className={styles.inputdiv}>
                <input type="text" placeholder='Room ID' required onChange={(e)=>{handleCreate(e)} }></input>
            </div>

            <div className={styles.btndiv}>
                <button onClick={handleCreateRoom}>Create</button>
            </div>

         </div>

         <div className={styles.container}>

            <div className={styles.pic}>
            
                <img src={video}></img>
            
            </div>

            <div className={styles.context}>
              <p>Join Room</p>
            </div>

            <div className={styles.inputdiv}>
                <input type="text" placeholder='Room ID' required onChange={(e)=>{handleJoin(e)}}></input>
            </div>

            <div className={styles.btndiv}>
                <button onClick={handleJoinRoom}>Join</button>
            </div>

         </div>
        </div>

    </div>

    </>)
}

export default Select;