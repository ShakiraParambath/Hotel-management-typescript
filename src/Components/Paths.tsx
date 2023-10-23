
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import HomeComponent from './HomeComponent';

export default function Paths (){
    return(
        <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          
          <Route path="/home/*" element={<HomeComponent/>} />
        
        </Routes>
      </Router>
      
      )
}
