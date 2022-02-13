import "./style.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../component";
import { followUser } from "../../features/user/userSlice";
import { allUsers } from "../../features/user/userSlice";

export function ExploreCard({ data, ...props }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const label = user?.following?.find(({ _id }) => _id === data._id);
  
  return (
    <div className="exploreCard" key ={data._id}>
      <Link to={`/profile/${data._id}`}>
        <img className="ec__img" src={data.displayPic} alt="userDisplay" />
        <div className="ec__name">{data.username}</div>
      </Link>
      <div className="ec__btn">
        <button
          className="ec__followBtn"
          onClick={() => dispatch(followUser({ toFollow: data._id }))}
        >
          {label ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default function Explore() {
  const { user, otherUsers, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const explore =(others)=>{
    const userIds = user.following.map((data)=>data._id)
    return others._id !== user._id && !userIds.includes(others._id)
   
  }

  useEffect(() => {
    (async () => {
      dispatch(allUsers());
    })();
  }, [dispatch]);
  return (
    <div className="explorePage">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <div className="exploreList">
          {otherUsers.map((data) => {
            return explore(data) && <ExploreCard data={data} key={data._id}/>;
          })}
        </div>
      )}
    </div>
  );
}
