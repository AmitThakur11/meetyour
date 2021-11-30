import React from 'react';
import './index.css';
import Header from "./component/header/index"
import Home from './pages/home';
import Profile from './pages/profile/index';
import {Routes ,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/login" />
        <Route path ="/register"/>
        <Route path ="/profile" element={<Profile/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
