import { RiCloseCircleFill } from "react-icons/ri";

import FollowCard from "../FollowCard";
import "./style.css";
export default function LikeList({ show, data, ...props }) {
  return (
    <div className="likeList__section">
      <div className="likeList__closeBtn" onClick={() => show(false)}>
        <RiCloseCircleFill />
      </div>
      <div className="likeList__wrapper">
        {data.map((like) => {
          return (
            <>
              <FollowCard user={like} />
            </>
          );
        })}
      </div>
    </div>
  );
}
