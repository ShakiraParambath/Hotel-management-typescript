import { Router } from "express";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Paths (){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    )
}