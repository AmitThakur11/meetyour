import { useEffect } from "react";
import "./index.css";
import Header from "./component/header/index";
import Home from "./pages/home";
import Profile from "./pages/profile/index";
import Register from "./pages/register";
import Login from "./pages/login";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import ShowPost from "./pages/ShowPost";
import { Routes, Route } from "react-router-dom";
import { fetchUser} from "./features/user/userSlice";
import { getPosts } from "./features/post/postSlice";
import PageNotFound from "./pages/pageNotFound";
import PrivateRoute from "./features/user/privateRoute"
import Posts from "./pages/Posts"
import Saved from "./pages/Saved"
import Explore from "./pages/Explore"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch , useSelector } from "react-redux";
import axiosInitializer from "./utils/axiosInitializer";





function App() {
  const dispatch = useDispatch();
  const {login,user} = useSelector((state)=>state.user)
  axiosInitializer()
  useEffect(() => {
    
    (async () => {
      if(login){
        dispatch(fetchUser());
        dispatch(getPosts())
      }
      
    })();
  }, [dispatch,login]);

  return (
    <div className="App">
      <Header />

      <Routes>
          <PrivateRoute  exact path="/" element={<Home/>} />
          <PrivateRoute   path="/profile/:userId" element={<Profile />} />
          <PrivateRoute   path="/posts" element={<Posts />} />
          <PrivateRoute   path="/saved" element={<Saved />} />
          <PrivateRoute   path="/explore" element={<Explore />} />
          <PrivateRoute   path="/post/:postId" element={<ShowPost />} />
          <PrivateRoute   path="/followers" element={<Followers />} />
          <PrivateRoute   path="/following" element={<Following />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path = "*" element ={<PageNotFound/>}/>
      
      </Routes>

        
      <ToastContainer/>

    </div>
  );
}

export default App;
