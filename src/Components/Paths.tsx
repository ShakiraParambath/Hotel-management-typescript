
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuComponents from "./MenuComponents";


export default function Paths (){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/home" element={<MenuComponents/>} />
        </Routes>
      </BrowserRouter>
    )
}