
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MenuComponents from "./MenuComponents";
import HomeComponent from './HomeComponent';

export default function Paths (){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/home" element={<HomeComponent/>} />
        </Routes>
      </BrowserRouter>
    //   <Router data-testid="main">
    //    <Route path="/" element={<Login />}/>
    //   <Route path="/signup" element={<SignUp />}/>
    //   <Switch>
    //   <Route path="/home" element={<HomeComponent/>} />
    //  </Switch>
    //  </Router>
      )
}