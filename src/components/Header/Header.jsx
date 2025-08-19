import React, { useEffect } from 'react'
import './style.css'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from '../../assets/userPlaceholder.jpg'
import about from '../About/About';


const Header = () => {

  const [user, loading] = useAuthState(auth);
const navigate = useNavigate();
useEffect(() => {
if(user){
  navigate('/dashboard');
}
},[user,loading]);


    const logoutFnc = () => {
try{
      signOut(auth).then(() => {
        navigate('/');
        toast.success("Logged out successfully");
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  toast.error(error.message);
});
}catch(e){
  toast.error(e.message);
}

    }
     const about = () => {   
    navigate('/about');
  };
    
  return (
    <div className='navbar'>
      <div className='logo-img'>
      <img src="finacne.png" alt="" style={{width:50 , height:50}} />
   <p className='logo'>Financely.</p>
      </div>
   {user && (
    
    <div style={{display:"flex", alignItems:"center", gap:"0.9rem"}}>
     <p onClick={about} className='about'>About</p>
      <img src={user.photoURL ? user.photoURL : userImg}
      style={{borderRadius:"50%", height:"2rem",
      width:"2rem"}}
      />
    
    <p className='logo link' onClick={logoutFnc}>LogOut</p>
    </div>
    ) }
   
    </div>
  )
}

export default Header
