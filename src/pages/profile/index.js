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
import { followUser } from "../../features/user/userSlice";
import {
  changeProfilePic
} from "../../features/user/userSlice";
import Loader from "../../component/loader"
function Profile() {
  let [subPage, setSubPage] = useState("Post");
  let [profile , setProfile] = useState([])
  let [loader , setLoader] = useState(false)
  let { user , status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userId } = useParams();

  
  const isAdmin = user?._id === userId;
  const label = user?.following?.find(({_id})=>_id === profile._id);

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
  },[userId,user,isAdmin])

  return (
    <section className="profileLayout">
      {loader && <Loader/>}
      {
       !loader &&  <>
        <section className="profileLayout__wrapper">
        <div className="profileHeader__img">
          <div className="pd__img">
            {status ==="loading" ? <h1>Just a sec</h1>:<img src={profile?.displayPic} alt="/" />}
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
            {!isAdmin && <button onClick={() => dispatch(followUser({ toFollow: profile._id }))}>{label ? "Unfollow" : "Follow"}</button>}
          </div>
          <div className="profileBio">
            <p>{profile?.bio}</p>
            <a href={profile?.website}>
              <HiLink/><span>{profile?.website}</span>
            </a>
          </div>
          
        </div>
      </section>
      <div className="profileButton__section">
      <div className="profileButton__wrapper">

            <ProfileButton
              label = "About"
              onClick={() => setSubPage("About")}
              subPage={subPage}
              
            />
            <ProfileButton
            data = {profile.followers}
              label= "Post"
              onClick={() => setSubPage("Post")}
              subPage={subPage}
            />
            <ProfileButton
              
              label = "Followers"
              onClick={() => setSubPage("Followers")}
              subPage={subPage}
            />
            <ProfileButton
            data = {profile.following}

              label = "Following"
              onClick={() => setSubPage("Following")}
              subPage={subPage}
            />
            {isAdmin && <ProfileButton
            data = {profile.savePost}
              label = "Saved"
              onClick={() => setSubPage("Saved")}
              subPage={subPage}
            />}
          </div>
     </div>
     <div className="profileData">
        <div className="profileData__wrapper">
          {subPage === "Post" && <UserPost post={profile.post} isAdmin={isAdmin}/>}
          {subPage === "About" && <About user={profile} isAdmin={isAdmin} />}
          {subPage === "Followers" && <UserDataPage user={{data : profile.followers , title  :"Followers"}} isAdmin={isAdmin} />}
          {subPage === "Following" && <UserDataPage user={{data : profile.following , title  :"Following"}} isAdmin={isAdmin} />}
          {subPage === "Saved"  && (
            <UserPost post={profile.savePost} isAdmin={isAdmin}  />
          )}
        </div>
      
      </div>
</>}
    </section>
  );
}

export default Profile;

