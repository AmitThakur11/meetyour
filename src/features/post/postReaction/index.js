import "./style.css";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../postSlice";
function PostReaction(props) {
  const { post , setDisplayComment } = props;
  const { user } = useSelector((state) => state.user);
  const isLiked = post.like.find((like) => like._id === user._id);
  const dispatch = useDispatch();
  return (
    <section className="postReaction">
      <section className="postReaction__wrapper">
        <div className="reaction">
          <label
            style={isLiked && { color: 'var(--primary-color)' }}
            onClick={() => dispatch(likePost(post._id))}
          >
            {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
          </label>
          <div className="count">{post.like.length}</div>
        </div>
        <div
          className="reaction"
          onClick={() =>
            setDisplayComment((comment) => {
              return { ...comment, inputComment: !comment.inputComment };
            })
          }
        >
          <label>
            <IoChatbubbleOutline />
          </label>
        </div>
        <div className="reaction">
          <label>
            <IoBookmarkOutline />
          </label>
        </div>
      </section>
    </section>
  );
}

export default PostReaction;
