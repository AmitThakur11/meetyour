import "./style.css";
import React, { useState } from "react";
import TimeAgo from "../timeAgo";
import { useDispatch } from "react-redux";
import { likePost } from "../postSlice";
import PostReaction from "../postReaction";
import CommentSection from "../commentSection";
function PostCard(props) {
  const { post , setPostLikes , setShowLikes } = props;
  const dispatch = useDispatch();
  const [displayComment, setDisplayComment] = useState({
    inputComment: false,
    commentQty: 1,
  });

  return (
    <div key={post?._id} className="postCard">
      <section className="postHeader">
        <div className="userDetail">
          <img src={post?.author?.displayPic} alt="userimg" />
          <div>{post?.author?.username}</div>
          <div className ="postTime">
            <TimeAgo
            timestamp={post.createdAt}
          />
          </div>
        </div>
      </section>
      <section
        className="postMedia"
        onDoubleClick={() => dispatch(likePost(post._id))}
      >
        <img src={post?.media[0]} alt="post" />
      </section>
      <PostReaction post={post} setDisplayComment={setDisplayComment}  setPostLikes = {setPostLikes}  setShowLikes = {setShowLikes} />

      <section className="captionContainer">
        <div className="caption">
          {post.caption}
          <br />
         
        </div>
      </section>
      <CommentSection
        displayComment={displayComment}
        post={post}
        setDisplayComment={setDisplayComment}
      />
    </div>
  );
}

export default PostCard;
