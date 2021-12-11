import { useEffect } from "react";
import "./index.css";
import Header from "./component/header/index";
import Home from "./pages/home";
import Profile from "./pages/profile/index";
import Register from "./pages/register";
import Login from "./pages/login";
import ShowPost from "./pages/ShowPost";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { fetchUser ,allUsers} from "./features/user/userSlice";
import { getPosts } from "./features/post/postSlice";

import PrivateRoute from "./features/user/privateRoute"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";




function App() {
  const dispatch = useDispatch();

  axios.defaults.baseURL = "https://meetyourbackend.herokuapp.com";
  axios.defaults.headers.common["Authorization"] = JSON.parse(
    localStorage?.getItem("auth")
  )?.token;

  const {login } = useSelector((state) => state.user);



  useEffect(() => {
    
    (async () => {
      dispatch(getPosts());
      let isLogin = JSON.parse(localStorage?.getItem("auth"))?.login;
      if(isLogin){
        dispatch(fetchUser());
        dispatch(allUsers())
      }
      
    })();
  }, [dispatch,login]);

  return (
    <div className="App">
      <Header />

      <Routes>
          <PrivateRoute  exact path="/" element={<Home/>} />
          <PrivateRoute   path="/profile/:userId" element={<Profile />} />
          <PrivateRoute   path="/post/:postId" element={<ShowPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      
      </Routes>

        
      <ToastContainer/>

    </div>
  );
}

export default App;
