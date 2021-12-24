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
import {savePost} from "../../user/userSlice"
function PostReaction(props) {
  const { post, setDisplayComment } = props;
  const { user } = useSelector((state) => state.user);
  const isLiked = post?.like?.find((like) => like._id === user._id);
 
  const isSaved = (savePost)=>{
    
    return savePost?.find((saveItem) => saveItem._id === post._id) ? true : false

  }
  
  const dispatch = useDispatch();
  return (
    <section className="postReaction">
      <section className="postReaction__wrapper">
        <div className="reaction">
          <label
            style={isLiked && { color: "var(--primary-color)" }}
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
        <div className="reaction" onClick={() => dispatch(savePost(post._id))}>
          <label
            style={isLiked && { color: "var(--primary-color)" }}
            onClick={() =>{
            console.log("clicked")
            dispatch(()=>savePost(post._id))}
            }
          >
            {/* <IoBookmark /> */}
            {isSaved(user.savePost) ? <IoBookmark /> : <IoBookmarkOutline />}
          </label>
        </div>
      </section>
    </section>
  );
}

export default PostReaction;
