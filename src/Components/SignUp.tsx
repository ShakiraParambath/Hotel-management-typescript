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
//         <div>
//         <form onSubmit={handleSubmit}>
//         <p>Please select your Role:</p>
//         <input type="radio" id="Admin" name="role" value="Admin" style={{marginLeft:"18px"}} onClick={()=>setRole("Admin")}/>
//         <label htmlFor="Admin">Admin</label><br/>
//         <input type="radio" id="Hotel-admin" name="role" value="Hotel-admin" style={{marginLeft:"54px"}} onClick={()=>setRole("Hotel-Admin")}/>
//         <label htmlFor="Hotel-admin">Hotel-admin</label><br/>
//         <input type="radio" id="User" name="role" value="User" style={{marginRight:"0px"}} onClick={()=>setRole("User")}/>
//         <label htmlFor="User">User</label>     
//           <br/>
//             <input type="text" name="email" value={email} placeholder="enter email"  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setEmail(e.currentTarget.value)}}/><br/>
//             <input type ="password" name="password" value={password} placeholder="enter password"  onChange={(e)=>setPassword(e.target.value)}/><br/>
//             <button type="submit">Sign Up</button>
//         </form>
//     </div>
<div  data-testid="sign-up">
<form autoComplete="off" className="form" onSubmit={handleSubmit}style={{justifyContent:'center' ,width:'650px' , border:"2px solid black" ,   borderRadius:"30px"}} >
  <img src={logo} style={{width:"300px", height:"250px" ,marginLeft:'1px'}} alt="sky booking.com" />
  <h2  >Sign Up</h2>
  <p style={{marginLeft:'43px'}}>Fill the form below to create your account.</p>
  <div style={{marginRight:"257px"}} >
  <p>Please select your Role:</p>
        <input type="radio" id="Admin" name="role" value="Admin" style={{marginLeft:"18px"}} onClick={()=>setRole("Admin")}/>
        <label htmlFor="Admin">Admin</label><br/>
        <input type="radio" id="Hotel-admin" name="role" value="Hotel-admin" style={{marginLeft:"54px"}} onClick={()=>setRole("Hotel-Admin")}/>
        <label htmlFor="Hotel-admin">Hotel-admin</label><br/>
        <input type="radio" id="User" name="role" value="User" style={{marginRight:"0px"}} onClick={()=>setRole("User")}/>
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
      style={{ width: "450px",height:'50px',marginLeft:'39px'}} 
      required
      // autoComplete="true"
    />
   
    <br/>
    <br/>
  </div>
  <div className="password-input">
    <input
      name="password"
      placeholder="Enter password"
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
      type="password"
      style={{ width: "450px" , height:'50px',marginLeft:'39px'}} 
      required
      // autoComplete="true"
    />
    
  </div>
  <div className="option">
  <p  style={{marginLeft:'33px'}}>
    Already have an account?&nbsp;&nbsp;
    <Link to="/" >Sign in</Link>
  </p>
</div>
  <div className="btn" data-testid="button">
    {error ? <p className="login-error" style={{color:"red"}}>{error}</p> : null}
    <button  type="submit" style={{marginLeft:'50px',backgroundColor: '#008CBA',}}  >
      Create account
    </button>
  </div>
  <br/>
</form>

</div>
    )
   
}