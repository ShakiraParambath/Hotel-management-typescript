import React,{useState,ChangeEvent } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {firebaseApp} from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import logo from './bluesky.png'
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    // const [input, setInput] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const[password,setPassword] = useState("");
    const [error, setError] = useState("");
    const [role,setRole] =useState("");
  // initialised auth instance
  const auth = getAuth(firebaseApp);

// handle form submit
  const handleSubmit = async (e: { preventDefault: () => void; }) => {

    e.preventDefault();
    setError("");
    let Email = email.toLowerCase().trim();


    // creating a new user
    await createUserWithEmailAndPassword(auth, Email, password)
      .then(async (userCredential) => {
        // Signed up
        console.log(userCredential.user ,'');
        const user = userCredential.user;
        const firestore = getFirestore();

      const userRef = doc(firestore, "users", user.uid);

      await setDoc(userRef, {Role:role});
      console.log("user created")
    navigate('/');
        
      })
      .catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("The password is too weak.");
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError("The email address is already in use.");
      } else {
        // console.log(err.code);
        alert(err.code);
      }
      });
  };
 

    return (
<div  data-testid="sign-up" className="flex justify-center ...">
<form autoComplete="off" onSubmit={handleSubmit} className="justify-center mt-8 w-650 border-2 border-black rounded-30" >
  <img src={logo} className="w-300 h-250 ml-156" alt="sky booking.com" />
  <h2 className=" font-serif	mt-0 text-center ..." >Sign Up</h2>
  <p className=" font-serif	mt-0 text-center ...">Fill the form below to create your account.</p>
  <br/>
  <div className="flex justify-center  gap-4 ..." >
  <p className=" font-serif	mt-0 text-center  ...">Select Role  &nbsp;:</p>
        <input type="radio" id="Admin" name="role" value="Admin"  onClick={()=>setRole("Admin")}/>
        <label htmlFor="Admin">Admin</label><br/>
        <input type="radio" id="Hotel-admin" name="role" value="Hotel-admin" onClick={()=>setRole("Hotel-Admin")}/>
        <label htmlFor="Hotel-admin">Hotel-admin</label><br/>
        <input type="radio" id="User" name="role" value="User"  onClick={()=>setRole("User")}/>
        <label htmlFor="User">User</label>     
    <br/>
    <br/>
  </div>
  <div className="email-input">
    <input
      name="email"
      placeholder="Enter email"
      type="text"
      onChange={(e:ChangeEvent<HTMLInputElement>)=>{setEmail(e.currentTarget.value)}}
      value={email}
      // style={{ width: "450px",height:'50px',marginLeft:'39px'}} 
      className="w-450 h-50 ml-100 block text-gray-700  font-bold"
      required
      // autoComplete="true"
    />
    <br/>
  </div>
  <div className="password-input">
    <input
      name="password"
      placeholder="Enter password"
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
      type="password"
      // style={{ width: "450px" , height:'50px',marginLeft:'39px'}} 
      className="w-450 h-50 ml-100 block text-gray-700  font-bold"
      required
      // autoComplete="true"
    />
    
  </div>
  <br/>
  <div className="option">
  <p className="font-serif text-center ...">
    Already have an account?&nbsp;&nbsp;
    <Link to="/" className="text-[#1976d2] underline underline-offset-1 ...">Sign in</Link>
  </p>
</div>
<br/>
{error ? <p className="text-center text-red-600 " >{error}</p> : null}
  <div className="flex justify-center ..." data-testid="button"> 
    <button  type="submit" className="w-32 ml-14 bg-[#1976d2] border-0 text-white text-xl" >
      Sign Up
    </button>
  </div>
  <br/>
</form>

</div>
    )
   
}