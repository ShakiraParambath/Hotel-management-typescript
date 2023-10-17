import React,{useState} from "react";
import {  AuthErrorCodes, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../config/firebase"
import { firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link,useNavigate } from "react-router-dom";
import logo from './bluesky.png';

export const Login = () => {
    const [email,setEmail]=useState("");
    const navigate = useNavigate();
    const[password,setPassword] = useState("");
    const [error, setError] = useState("");

     // initialised auth instance
  const auth = getAuth(firebaseApp);
 
  // handle form submit
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setError("");
      let Email =email.toLowerCase().trim();
      
     
      // sign in user
      signInWithEmailAndPassword (auth, Email, password)
        .then (async (userCredential) => {
          // Signed in
          console.log(userCredential.user);
        
          const user = auth.currentUser;
          const userRef = doc(firestore, "users", userCredential.user.uid);
          console.log(userRef)
  
          await getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              // The document exists. You can access its data.
              const data = docSnapshot.data();
              console.log(data);
              sessionStorage.setItem("userRole", data.Role);
            } else {
              console.log("Document does not exist.");
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
          });
        console.log("user logged In")
         navigate('/home'); 
        })
        .catch((err) => {
          if (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED
        ) {
          setError("The email address or password is incorrect");
        } else {
          // console.log(err.code);
          // alert(err.code);
          setError(err.code)
        }
        });
    };

    return (
    <div  data-testid='login'>  
    <form autoComplete="off" onSubmit={handleSubmit} style={{justifyContent:'center' ,width:'650px' , border:"2px solid black" ,   borderRadius:"30px"}}>
       <img src={logo} style={{width:"300px", height:"250px"}} alt="sky booking.com"/>
        <h2 style={{fontFamily:'sans-serif' , marginTop:0}}>Sign into Your Account</h2>
        <div className="email-input">
      <input
        name="email"
        placeholder="Enter email"
        type="text"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        style={{ width: "450px" , height:'50px',marginLeft:'100px'}} 
        required
        autoComplete="true"
      />
      
    </div>
    <br/>
    <div className="password-input">
      <input
        name="password"
        placeholder="Enter password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        style={{ width: "450px" , height:'50px',marginLeft:'100px'}} 
        type="password"
        required
        autoComplete="true"
      />
    </div>
             <div className="option">
    <p>
      Don't have an account?&nbsp;&nbsp;
      <Link to="/signup" >Sign Up</Link>
    </p>
  </div>
    <div className="btn" data-testid="button">
      {error ? <p className="login-error" style={{color:"red"}}>{error}</p> : null}
      <button title="Login" aria-label="Login" type="submit"  style={{marginLeft:'53px',backgroundColor: '#008CBA',border: "none",
color: "white",
padding: "15px 32px",
fontSize:"18px"}} >
        Sign In
      </button>
    </div>
                    
    <br/>  
    </form>
    
    </div>
);
   
   
}