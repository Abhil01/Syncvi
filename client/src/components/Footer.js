import styles from './Footer.module.css';
const Footer = ()=>{
    let  year = new Date().getFullYear();
    return(
        <>
    <div className={styles.footerdiv}>
      <p className={styles.footertext}>© {year}. All rights reserved. Designed by Abhinav Lakhara.</p> 
    </div>
    </>)
}
export default Footer;