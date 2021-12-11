import "./style.css";
import { useDispatch } from "react-redux";
import { followUser } from "../../features/user/userSlice";
import {Link}from "react-router-dom"
function FollowCard(props) {
  const { user } = props;
  const dispatch = useDispatch();
  return (
      <>
      
    <div keys={user._id} className="followCard">
      <div className="fc_one">
      <Link to={`/profile/${user._id}`}>
        <img className="fc_userImg" src={user.displayPic} alt="user" />
      </Link>
      </div>
    
      <div className="fc_two">{user.username}</div>
      <div className="fc_three">
        <button
          className="fc_followBtn"
          onClick={() => dispatch(followUser({ toFollow: user._id }))}
        >
          Follow
        </button>
      </div>
    </div>
    </>
  );
  
}

export default FollowCard;
