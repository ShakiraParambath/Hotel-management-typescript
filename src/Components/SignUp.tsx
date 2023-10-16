import React,{useState,ChangeEvent } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {firebaseApp} from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


export const SignUp = () => {
    // const [input, setInput] = useState({ email: "", password: "" });
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
    //   window.location.href ='/'
        
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
        <div>
        <form onSubmit={handleSubmit}>
        <p>Please select your Role:</p>
        <input type="radio" id="Admin" name="role" value="Admin" style={{marginLeft:"18px"}} onClick={()=>setRole("Admin")}/>
        <label htmlFor="Admin">Admin</label><br/>
        <input type="radio" id="Hotel-admin" name="role" value="Hotel-admin" style={{marginLeft:"54px"}} onClick={()=>setRole("Hotel-Admin")}/>
        <label htmlFor="Hotel-admin">Hotel-admin</label><br/>
        <input type="radio" id="User" name="role" value="User" style={{marginRight:"0px"}} onClick={()=>setRole("User")}/>
        <label htmlFor="User">User</label>     
          <br/>
            <input type="text" name="email" value={email} placeholder="enter email"  onChange={(e:ChangeEvent<HTMLInputElement>)=>{setEmail(e.currentTarget.value)}}/><br/>
            <input type ="password" name="password" value={password} placeholder="enter password"  onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    )
   
}