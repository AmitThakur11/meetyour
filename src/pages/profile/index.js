import { useState , useEffect} from "react";
import "./style.css";
import axios from "axios"
import { RiCamera3Line } from "react-icons/ri";
import {HiLink} from "react-icons/hi"
import ProfileButton from "../../features/user/ProfileButton/index";
import About from "../../features/user/about";
import UserPost from "../../features/user/userPosts";
import UserDataPage from "../../features/user/userDataPage";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import {
  changeProfilePic
} from "../../features/user/userSlice";
import Loader from "../../component/loader"
import { FaGalacticSenate } from "react-icons/fa";
function Profile() {
  let [subPage, setSubPage] = useState("post");
  let [profile , setProfile] = useState([])
  let [loader , setLoader] = useState(false)
  let { user , otherUsers , status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userId } = useParams();

  
  const isAdmin = user?._id === userId;

  useEffect(()=>{
    (async()=>{
      try{
        setLoader(true)
        if(!isAdmin){
          const response = await axios.get(`/user/profile/${userId}`)
          setProfile(response.data.data)
        }
        else{
          setProfile(user)
        }
        setLoader(false)
      
      }catch(err){
        setLoader(false)
      }
      
    })()
  },[userId,user])

  return (
    <section className="profileLayout">
      {loader && <Loader/>}
      {
       !loader &&  <>
        <section className="profileLayout__wrapper">
        <div className="profileHeader__img">
          <div className="pd__img">
            <img src={profile?.displayPic} alt="/" />
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
              {profile?.username}
            </div>
            {!isAdmin && <button>Follow</button>}
          </div>
          <div className="profileBio">
            <p>{profile?.bio}</p>
            <a href={profile?.website}>
              <HiLink/><span>{profile?.website}</span>
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
              name={`Post(${profile?.post?.length})`}
              label= "post"
              onClick={() => setSubPage("post")}
              subPage={subPage}
            />
            <ProfileButton
              name={`Followers(${profile?.followers?.length})`}
              label = "followers"
              onClick={() => setSubPage("followers")}
              subPage={subPage}
            />
            <ProfileButton
              name={`Following(${profile?.following?.length})`}
              label = "following"
              onClick={() => setSubPage("following")}
              subPage={subPage}
            />
            {isAdmin && <ProfileButton
              name={`Saved(${profile?.savePost?.length})`}
              label = "saved"
              onClick={() => setSubPage("saved")}
              subPage={subPage}
            />}
          </div>
      <div className="profileData">
        <div className="profileData__wrapper">
          {subPage === "post" && <UserPost post={profile.post} isAdmin={isAdmin}/>}
          {subPage === "about" && <About user={profile} isAdmin={isAdmin} />}
          {subPage === "followers" && <UserDataPage user={{data : profile.followers , title  :"Followers"}} isAdmin={isAdmin} />}
          {subPage === "following" && <UserDataPage user={{data : profile.following , title  :"Following"}} isAdmin={isAdmin} />}
          {subPage === "saved"  && (
            <UserPost post={profile.savePost} isAdmin={isAdmin}  />
          )}
        </div>
      
      </div>
</>}
    </section>
  );
}

export default Profile;

