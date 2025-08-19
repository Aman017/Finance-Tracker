import React, { useState } from 'react'
import './style.css'
import Input from '../../components/input/Input.jsx'
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { auth, db, provider, } from '../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const SingupSinginComponent = () => {
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');
  const [loginform, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log(name,"name")
    console.log(email,"Email")
    console.log(password,"password")
    console.log(confirmPassword,"confimpassword")
    //firebase authication code will go here

    if(name!="" && email!="" && password!="" && confirmPassword!="") {
      if(password == confirmPassword) {
 createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user, "user created successfully");
    toast.success("User created successfully");
    setLoading(false);
    setConfirmPassword  ("");
    setEmail("");
    setName("");
    setPassword("");
    createDoc(user);// Call function to create a document in Firestore
    navigate('/dashboard'); // Redirect to dashboard after signup

    //create a doc using user uid


    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
    // ..
  });
      }else{
        toast.error("Password and Confirm Password do not match");
        setLoading(false);
      }
   
  } else{
    toast.error("All fields are required" )
    setLoading(false);
  }
}
function loginUsingEmail() {
  console.log(email,"Email");
  console.log(password,"password");
  setLoading(true);
  if(email!="" && password!="") {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("Login Successful");
    console.log(user, "user logged in successfully");
    setLoading(false);
    navigate('/dashboard'); // Redirect to dashboard after login
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error(errorMessage);
  });
  }else{
    toast.error("Email and Password are required");
    setLoading(false); 
  }

}


async function createDoc(user){
  // creat doc
setLoading(true);
  if(!user) return;
  const userRef = doc(db, "users", user.uid);
  const userData = await getDoc(userRef);

  if(!userData.exists()) {

  try{
await setDoc(doc(db, "users", user.uid), {
name: user.displayName ? user.displayName : name,
email: user.email,
photoURL: user.photoURL? user.photoURL :"",
createdAt:new Date(),
});
toast.success("User document created successfully");
} catch(e){
  toast.error(e.message)
  setLoading(false);
}
}else{
  // toast.error("User already exists");
  setLoading(false);
}
  }

function googleAuth(){
  setLoading(true);
  try{

 
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user, "user logged in with google successfully");
    createDoc(user); // Call function to create a document in Firestore
    setLoading(false);
    navigate('/dashboard'); // Redirect to dashboard after login
    toast.success("Login Successful");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });
   } catch(e){
    toast.error(e.message);
    setLoading(false);
  }
}


  return (
    <>
    {loginform ? (<div className='singup-wrapper'>
      <h2 className='title'>Login On <span style={{ color: "var(--theme)" }}> financely.</span> </h2>
      <form>
        
        <Input type="email" label={"Email"}state={email} setState={setEmail} placeholder={"abcd@abcd.com"} />
        <Input type="password" label={"Password"}state={password} setState={setPassword} placeholder={"Password"} />
       
        <Button disabled={loading} text={loading?"Loading...":"Login Using Email and Password"} onClick={loginUsingEmail}/>
        <p className='p-login'>or</p>
        <Button onClick={googleAuth} text={loading?"Loading...":"Login Using Google"} blue={true}  />
          <p className='p-login' style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginform)}> Or Don't Have an Account? Click Here </p>
      </form>
    </div>
    )  : (<div className='singup-wrapper'>
      <h2 className='title'>Sing Up On <span style={{ color: "var(--theme)" }}> financely.</span> </h2>
      <form>
        <Input label={"Full Name"}state={name} setState={setName} placeholder={"jon doe"} />
        <Input type="email" label={"Email"}state={email} setState={setEmail} placeholder={"abcd@abcd.com"} />
        <Input type="password" label={"Password"}state={password} setState={setPassword} placeholder={"Password"} />
        <Input type="password" label={"Confirm Password"}state={confirmPassword} setState={setConfirmPassword} placeholder={"Confirm Password"} />
        <Button disabled={loading} text={loading?"Loading...":"Signup Using Email and Password"} onClick={signupWithEmail}/>
        <p className='p-login'>or</p>
        <Button onClick={googleAuth} text={loading?"Loading...":"Signup Using Google"} blue={true}  />
        <p className='p-login'style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginform)} > Or  Have an Account? Click Here </p>
      </form>
    </div>
    )  
  }
   
    </>
  )
}

export default SingupSinginComponent
