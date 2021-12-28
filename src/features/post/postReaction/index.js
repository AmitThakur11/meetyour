import "./style.css";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../postSlice";
import { savePost } from "../../user/userSlice";

export default function PostReaction(props) {
  const { post, setDisplayComment, setPostLikes, setShowLikes } = props;
  const { user } = useSelector((state) => state.user);

  const isLiked = post.like.find((like) => like._id === user._id);
  const isSaved = (savePost) => {
    return savePost?.find((saveItem) => saveItem._id === post._id)
      ? true
      : false;
  };

  const dispatch = useDispatch();
  return (
    <section className="postReaction">
      {post.like.length > 0 ? (
        <div
          className="likedBy"
          onClick={() => {
            setShowLikes((show) => !show);
            setPostLikes(post.like);
          }}
        >
          {" "}
          liked by{" "}
          <span>
            {post.like[0].username}
            {post.like.length > 1 && ` and ${post.like.length - 1} other`}
          </span>
        </div>
      ) : (
        <div className="likedBy">0 likes</div>
      )}
      <section className="postReaction__wrapper">
        <div className="reaction">
          <label
            style={isLiked && { color: "var(--primary-color)" }}
            onClick={() => dispatch(likePost(post._id))}
          >
            {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
          </label>
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
        <div className="reaction" onClick={() => dispatch(savePost(post._id))}>
          <label
            style={isLiked && { color: "var(--primary-color)" }}
            onClick={() => {
              dispatch(() => savePost(post._id));
            }}
          >
            {isSaved(user.savePost) ? <IoBookmark /> : <IoBookmarkOutline />}
          </label>
        </div>
      </section>
    </section>
  );
}
