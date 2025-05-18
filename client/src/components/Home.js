import styles from './Home.module.css';
import { useEffect } from 'react';
import Footer from './Footer';
import { Link , useNavigate} from 'react-router';
import axios from 'axios';
const Home = () =>{
    const navigate = useNavigate();
    const upload = new URL("../assets/upload.svg",import.meta.url).href;
    const monitor = new URL("../assets/monitor.svg",import.meta.url).href;
    const chat = new URL("../assets/chat.svg",import.meta.url).href;

    

    useEffect(()=>{
       const remove = async()=>{
        try{
          const res = await axios('http://localhost:3030/logout',{withCredentials:true});
        }catch(err){
          console.log(err.message);
        }
       }
       remove();
    },[])




    const handleCreate =()=>{
         
         navigate('/login');
    }


    return(
  <>
    <div className={styles.headContainer}>
        
        <div className={styles.header}>
            <Link to={"/login"} className={styles.link}>Login</Link>
            <Link to= {"/signup"}className={styles.link}>Sign up</Link>
        </div>
        
        <div className={styles.headcontent}>
            <p>Watch Together,
            <br></br>
            No Matter Where You Are.</p>
          
        </div>

        <div className={styles.content}>
          <p> Upload your own videos and watch with friends
           <br></br>
           in perfect sync.</p>
        </div>

        <div className={styles.btn}>
            <button onClick={handleCreate}>Create Room</button>
        </div>

    </div>

    <div className={styles.bodyContainer}>
        <div className={styles.bodyhead}>How It Works</div>

        <div className={styles.iconholder}>

          <div className={styles.icon}>
             
             <div className={styles.pic}>

                <img src={upload}></img>

             </div>
             
             <div className={styles.icontext}>
                <p>1
                <br></br>
                Upload
                <br></br>
                video</p>
             </div>
          
          </div>

          <div className={styles.icon}>

            <div className={styles.pic}>
                 <img src={chat}></img>
            </div>
            <div className={styles.icontext}>
                <p>2
                <br></br>
                Create/Join
                <br></br>
                Room
                </p>
            </div>

          </div>


          <div className={styles.icon}>

            <div className={styles.pic}>
                <img src={monitor}></img>
            </div>
            <div className={styles.icontext}>
                <p>3<br></br>
                Watch in sync
                </p>
            </div>

          </div>

        </div>
    </div>
    <Footer/>
    </>)
}
export default Home;