import { useState} from "react";
import "./style.css";
import { RiCamera3Line } from "react-icons/ri";
import {HiLink} from "react-icons/hi"
import ProfileButton from "../../features/user/ProfileButton/index";
import About from "../../features/user/about";
import UserPost from "../../features/user/userPosts";
import UserDataPage from "../../features/user/userDataPage";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import UserSavePost from "../../features/user/userSavePost";

import {
  changeProfilePic
} from "../../features/user/userSlice";
import Loader from "../../component/loader"
function Profile() {
  let [subPage, setSubPage] = useState("post");
  let { user , otherUsers , status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  user = user._id === userId ? user :  otherUsers?.find(({ _id }) => _id === userId);
  const admin = useSelector((state) => state?.user?.user);
  const isAdmin = user?._id === admin?._id;

  return (
    <section className="profileLayout">
      {status ==="loading" && <Loader/>}
      {
       status === "success" &&  <>
        <section className="profileLayout__wrapper">
        <div className="profileHeader__img">
          <div className="pd__img">
            <img src={user?.displayPic} alt="/" />
            {isAdmin && (
              <label htmlFor="picChange" className="pd__imgEditBtn">
                <RiCamera3Line />
              </label>
            )}
            <input
              id="picChange"
              type="file"
              onChange={(e) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                  dispatch(changeProfilePic(reader.result));
                };
              }}
            />
          </div>
        </div>
        <div className="profileHeader__detail">
          <div className ="pd__NameContainer">
            <div className="pd__Name">
              <span>@</span>
              {user?.username}
            </div>
            {!isAdmin && <button>Follow</button>}
          </div>
          <div className="profileBio">
            <p>{user?.bio}</p>
            <a href={user?.website}>
              <HiLink/><span>{user?.website}</span>
            </a>
          </div>
          
        </div>
      </section>
      <div className="profileButton__wrapper">
            <ProfileButton
              name="About"
              label = "about"
              onClick={() => setSubPage("about")}
              subPage={subPage}
              
            />
            <ProfileButton
              name={`Post(${user.post.length})`}
              label= "post"
              onClick={() => setSubPage("post")}
              subPage={subPage}
            />
            <ProfileButton
              name={`Followers(${user?.followers.length})`}
              label = "followers"
              onClick={() => setSubPage("followers")}
              subPage={subPage}
            />
            <ProfileButton
              name={`Following(${user?.following.length})`}
              label = "following"
              onClick={() => setSubPage("following")}
              subPage={subPage}
            />
            <ProfileButton
              name={`Saved(${user?.savePost.length})`}
              label = "saved"
              onClick={() => setSubPage("saved")}
              subPage={subPage}
            />
          </div>
      <div className="profileData">
        <div className="profileData__wrapper">
          {subPage === "post" && <UserPost user={user} isAdmin={isAdmin} />}
          {subPage === "about" && <About user={user} isAdmin={isAdmin} />}
          {subPage === "followers" && <UserDataPage user={{data : user.followers , title  :"Followers"}} isAdmin={isAdmin} />}
          {subPage === "following" && <UserDataPage user={{data : user.following , title  :"Following"}} isAdmin={isAdmin} />}
          
          {subPage === "saved" && (
            <UserSavePost />
          )}
        </div>
      
      </div>
</>}
    </section>
  );
}

export default Profile;

// <div className ="about">
//                     <div className = "about">On the way to become a Full stack deveoper.</div>
//                     <a href ="http://localhost:3000"> http://localhost:3000</a>
//                 </div>
