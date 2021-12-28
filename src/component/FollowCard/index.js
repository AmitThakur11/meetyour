import "./style.css";
import { useDispatch , useSelector } from "react-redux";
import { followUser } from "../../features/user/userSlice";
import {Link}from "react-router-dom";
import { TiPlus } from "react-icons/ti";
function FollowCard(props) {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user)
  const label = user?.following?.find(({_id})=>_id === props.user._id)
  return (
      <>
      
    <div keys={props.user._id} className="followCard">
      <div className="fc_one">
      <Link to={`/profile/${props.user._id}`}>
        <img className="fc_userImg" src={props.user.displayPic} alt="user" />
      </Link>
      </div>
    
      <div className="fc_two">{props.user.username}</div>
      <div className="fc_three">
        <button
          className="fc_followBtn"
          onClick={() => dispatch(followUser({ toFollow: props.user._id }))}
        >
          {label ? <span>Unfollow  </span>: <span> Follow <TiPlus/></span> }
        </button>
      </div>
    </div>
    </>
  );
  
}

export default FollowCard;
