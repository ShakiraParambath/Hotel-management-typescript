import React,{useState} from "react";
import {  AuthErrorCodes, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../config/firebase"
import { firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const Login = () => {
    const [email,setEmail]=useState("");
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
          
        })
        .catch((err) => {
          if (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED
        ) {
          setError("The email address or password is incorrect");
        } else {
          // console.log(err.code);
          alert(err.code);
        }
        });
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={email} placeholder="enter email" onChange={(e)=>setEmail(e.target.value)}/><br/>
            <input type ="password" name="password" value={password} placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button type="submit">Login</button>
        </form>
    </div>
    )
   
}