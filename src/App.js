import { useEffect } from "react";
import "./index.css";
import Header from "./component/Header/index";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/user/userSlice";
import { getPosts } from "./features/post/postSlice";
import PrivateRoute from "./features/user/privateRoute";
import {
  Explore,
  Saved,
  Posts,
  PageNotFound,
  ShowPost,
  Home,
  Profile,
  Login,
  Followers,
  Following,
  Register,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axiosInitializer from "./utils/axiosInitializer";

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.user);
  axiosInitializer();
  useEffect(() => {
    (async () => {
      if (login) {
        dispatch(fetchUser());
        dispatch(getPosts());
      }
    })();
  }, [dispatch, login]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <PrivateRoute exact path="/" element={<Home />} />
        <PrivateRoute path="/profile/:userId" element={<Profile />} />
        <PrivateRoute path="/posts" element={<Posts />} />
        <PrivateRoute path="/saved" element={<Saved />} />
        <PrivateRoute path="/explore" element={<Explore />} />
        <PrivateRoute path="/post/:postId" element={<ShowPost />} />
        <PrivateRoute path="/followers" element={<Followers />} />
        <PrivateRoute path="/following" element={<Following />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
