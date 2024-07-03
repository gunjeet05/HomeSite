import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Header1 from "./Components/Header1";
const App = () => {
  return <Router>
    <Header1/>
    
   <Routes>

   <Route path="/"  element={<Home/>}/> 
   <Route path="/SignIn"  element={<Login/>}/>
   <Route path="/signup"  element={<SignUp/>}/> 
   <Route path="/Profile"  element={<Profile/>}/> 
   <Route path="/About"  element={<About/>}/> 

   </Routes>
  </Router>;

};

export default App;
