import React from 'react';
import './index.css';
import Header from "./component/header/index"
import Home from './pages/home';
import Profile from './pages/profile/index';
import Register from "./pages/register"
import Login from "./pages/login"
import {Routes ,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/login" element={<Login/>} />
        <Route path ="/register" element = {<Register/>}/>
        <Route path ="/profile" element={<Profile/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
