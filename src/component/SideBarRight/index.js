import { useEffect} from "react";
import FollowCard from "../FollowCard";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../features/user/userSlice";
import { MdOutlineExplore } from "react-icons/md";
import "./style.css";
import { useNavigate } from "react-router";

function SideBarRight({ on }) {
  const dispatch = useDispatch();

  const { user, otherUsers } = useSelector((state) => state.user);

  const explore = ()=>{
    const userIds = user.following?.map((data)=>data._id)
    const notFollowed = otherUsers.filter((otherUser)=> user._id !== otherUser._id && !userIds?.includes(otherUser._id))
    return notFollowed
   
  }
  const exploreData = explore()



  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(allUsers())
  },[dispatch])
  return (
    <section
      className={on ? "rightSideBar bar-two barOn" : "rightSideBar bar-two "}
    >
      <div className="exploreSection">
        <MdOutlineExplore />
      </div>
      {
        exploreData.map((explore,index)=>{
          return index < 3 &&  <FollowCard key={explore._id} user={explore} />
        })
      }
      <button className="exploreBtn" onClick={() => navigate("/explore")}>
        See more
      </button>
    </section>
  );
}

export default SideBarRight;
