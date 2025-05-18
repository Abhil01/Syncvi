import { useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router';
import axios from 'axios';
const Signup = () =>{
  
  const[username,setUsername] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(""); 
  const[success,setSuccess] = useState("");
  
  const handleUsername = (e) =>{
    setUsername(e.target.value);
  }


  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }


  const handlePassword = (e) =>{
    setPassword(e.target.value);
  }

  const handleSignup = async()=>{
    const data = {username,email,password};
    try{
        
       const res = await axios.post("http://localhost:3030/signup",data,{withCredentials:true});
       setError("");
       setSuccess("User Registered Successfully");
            
    }catch(err)
    { setSuccess("");
      setError(err.message);
    }
  }
  
 

return(
  <>
    <div className={styles.page}>

      <div className={styles.link}>
        <Link to={"/"} className={styles.linkvalue}>Home</Link>
      </div>
      
      <div className={styles.headtext}>
          <p>Sign up<br></br>to Be in Sync</p>
          
      </div>

      <div className={styles.status}> {error && (<p style={{color:'red'}}>Error:{error}</p>)}
            {success && (<p style={{color:'green'}}>Success:{success}</p>)}</div>

      <div className={styles.form}>
            <div className={styles.glassdiv}>
                <div className={styles.detail}>
                    
                    <div className={styles.field}>
                        <p>Username</p>
                        
                        <input type="text" className={styles.fieldval} onChange={(e)=>{handleUsername(e)}}></input>
                    </div>


                    
                    <div className={styles.field}>
                        <p>Email</p>
                        
                        <input type="text" className={styles.fieldval} onChange={(e)=>{handleEmail(e)}}></input>
                    </div>

                    <div className={styles.field}>
                        <p>Password</p>
                        
                        <input type="password" className={styles.fieldval} onChange={(e)=>{handlePassword(e)}}></input>
                    </div>

                </div>

                <div className={styles.btn}><button className={styles.button} onClick={handleSignup}
                >Sign up</button></div>
            </div>
      </div>
     
    </div>
    </>)
}
export default Signup;