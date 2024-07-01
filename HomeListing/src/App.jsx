import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const App = () => {
  return <Router>
   <Routes>
   <Route path="/"  element={<Home/>}/> 
   <Route path="/Login"  element={<Login/>}/>
   <Route path="/signup"  element={<SignUp/>}/> 
   <Route path="/profile"  element={<Profile/>}/> 
   <Route path="/about"  element={<About/>}/> 

   </Routes>
  </Router>;
  
};

export default App;
