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
    const login_user = {
      userName:email,
  }
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
          sessionStorage.setItem("login-user",JSON.stringify(login_user));
        
          // const user = auth.currentUser;
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
    <div  data-testid='login' className="flex justify-center ...">  
    <br/>
    <form autoComplete="off" onSubmit={handleSubmit} className="justify-center w-650 border-2 border-black rounded-30">
       <img src={logo} className="w-300 h-250 ml-156" alt="sky booking.com"/>
        <h2 className=" font-serif	mt-0 text-center ..." >Sign into Your Account</h2>
        <div>
      <input
        name="email"
        placeholder="Enter email"
        type="text"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        className="w-450 h-50 ml-100"
        required
        autoComplete="true"
      />
      
    </div>
    <br/>
    <div >
      <input
        name="password"
        placeholder="Enter password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        className="w-450 h-50 ml-100"
        type="password"
        required
        autoComplete="true"
      />
    </div>
             <div className="option">
    <p className="font-serif text-center ...">
      Don't have an account?&nbsp;&nbsp;
      <Link to="/signup" className="text-blue-600 underline underline-offset-1 ...">Sign Up</Link>
    </p>
  </div>
  {error ? <p className="text-center text-red-600 " >{error}</p> : null}
    <div className="flex justify-center ..." data-testid="button">
      <button  title="Login" aria-label="Login" type="submit"  className="w-32 ml-14 bg-blue-500 border-0 text-white text-xl" >
        Sign In
      </button>
    </div>
                    
    <br/>  
    </form>
    
    </div>
);
   
   
}