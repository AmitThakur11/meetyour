import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { RiCamera3Line } from "react-icons/ri";
import { HiLink } from "react-icons/hi";
import { About, UserPost, ProfileButton } from "../../features/user";
import UserDataPage from "../../features/user/UserDataPage";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { followUser } from "../../features/user/userSlice";
import { changeProfilePic } from "../../features/user/userSlice";
import {compare} from "../../utils/function"
import Loader from "../../component/Loader";
function Profile() {
  let [subPage, setSubPage] = useState("Post");
  let [profile, setProfile] = useState([]);
  let [loader, setLoader] = useState(false);
  let { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userId } = useParams();

  

  const getProfilePic = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      dispatch(changeProfilePic(reader.result));
    };
  };

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        if (!compare(user._id,userId)) {
          const response = await axios.get(`/user/profile/${userId}`);
          setProfile(response.data.data);
        } else {
          setProfile(user);
        }
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    })();
  }, [userId, user]);

  return (
    <section className="profileLayout">
      {loader && <Loader />}
      {!loader && (
        <>
          <section className="profileLayout__wrapper">
            <div className="profileHeader__img">
              <div className="pd__img">
                {status === "loading" ? (
                  <h1 className="imageLoad__text">Updating...</h1>
                ) : (
                  <img src={profile?.displayPic} alt="/" />
                )}
                {compare(user._id,userId) && (
                  <label htmlFor="picChange" className="pd__imgEditBtn">
                    <RiCamera3Line />
                  </label>
                )}
                <input
                  id="picChange"
                  type="file"
                  onChange={(e) => getProfilePic(e)}
                />
              </div>
            </div>
            <div className="profileHeader__detail">
              <div className="pd__NameContainer">
                <div className="pd__Name">
                  <span>@</span>
                  {profile?.username}
                </div>
                {compare(user._id ,userId) && (
                  <button
                    onClick={() =>
                      dispatch(followUser({ toFollow: profile._id }))
                    }
                  >
                    {compare(user.following._id,profile._id)? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <div className="profileBio">
                <div>{profile.bio}</div>
                <a href={profile.website}>
                  <HiLink />
                  <span>{profile.website}</span>
                </a>
              </div>
            </div>
          </section>
          <div className="profileButton__section">
            <div className="profileButton__wrapper">
              <ProfileButton
                label="About"
                onClick={() => setSubPage("About")}
                subPage={subPage}
              />
              <ProfileButton
                data={profile.followers}
                label="Post"
                onClick={() => setSubPage("Post")}
                subPage={subPage}
              />
              <ProfileButton
                label="Followers"
                onClick={() => setSubPage("Followers")}
                subPage={subPage}
              />
              <ProfileButton
                data={profile.following}
                label="Following"
                onClick={() => setSubPage("Following")}
                subPage={subPage}
              />
              {compare(user._id,userId) && (
                <ProfileButton
                  data={profile.savePost}
                  label="Saved"
                  onClick={() => setSubPage("Saved")}
                  subPage={subPage}
                />
              )}
            </div>
          </div>
          <div className="profileData">
            <div className="profileData__wrapper">
              {subPage === "Post" && (
                <UserPost post={profile.post} />
              )}
              {subPage === "About" && (
                <About user={profile} isAdmin={compare(user._id,userId)} />
              )}
              {subPage === "Followers" && (
                <UserDataPage
                  user={{ data: profile.followers, title: "Followers" }}
                 
                />
              )}
              {subPage === "Following" && (
                <UserDataPage
                  user={{ data: profile.following, title: "Following" }}
                 
                />
              )}
              {subPage === "Saved" && (
                <UserPost post={profile.savePost} />
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Profile;
