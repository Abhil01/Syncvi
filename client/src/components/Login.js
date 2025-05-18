import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addData } from '../../utils/userSlice';
const Login =()=>{
 
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError]  = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
   
    const handleLogin = async()=>{
        try{
              const data = {email,password};
              const res = await axios.post('http://localhost:3030/login',data,{withCredentials:true});
              
              if(res.data){
              const{email:emailapi,username:usernameapi,password:passwordapi} = res.data;
                 
               dispatch(addData({emailapi,usernameapi,passwordapi})); 
              }


               
              setError("");
              navigate('/select');
        }
        catch(err){
            setError("Invalid Credentials");
        }
    }
    
    
    return(<>
    <div className={styles.page}>

      <div className={styles.link}>
        <Link to={"/"} className={styles.linkvalue}>Home</Link>
      </div>
      
      <div className={styles.headtext}>
          <p>Login to<br></br>Watch Together</p>
          
      </div>

      <div className={styles.status}>
        {error && (<p style={{color:'red'}}>Error:{error}</p>)}
      </div>
      <div className={styles.form}>
            <div className={styles.glassdiv}>
                <div className={styles.detail}>
                    <div className={styles.field}>
                        <p>Email</p>
                        
                        <input type="text" className={styles.fieldval} onChange={(e)=>{handleEmail(e)}}></input>
                    </div>

                    <div className={styles.field}>
                        <p>Password</p>
                        
                        <input type="password" className={styles.fieldval} onChange={(e)=>{handlePassword(e)}}></input>
                    </div>

                </div>

                <div className={styles.sign}><Link to={'/signup'} className={styles.signlink}>Don't have account?</Link></div>

                <div className={styles.btn}><button className={styles.button} onClick={handleLogin} >Login</button></div>
            </div>
      </div>
     
    </div>
    </>)
}
export default Login;