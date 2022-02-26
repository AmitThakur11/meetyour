import React, { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../postSlice";
import TimeAgo from "../timeAgo";

import { toast } from "react-toastify";
import {compare} from "../../../utils/function"
import {EditPostButton} from "./editPostBtn"
function CommentCard(props) {
  const { user } = useSelector((state) => state.user);
  const { input, comment, post, style } = props;
  const [commentText, setCommentText] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editComment ,setEditComment] = useState(false)
  const dispatch = useDispatch();
  const addNewComment = () => {
    if(commentText === ""){
      return toast.info("First write something")
    }
    dispatch(addComment({ postId: post._id, commentText: commentText }));
    setCommentText("");
  };

  return (
    <section className="commentWrapper" style={style}>
      <div>
        <img
          src={input ? user.displayPic : comment?.author?.displayPic}
          alt="/"
        />
      </div>
      <section className="commentDetail">
        <div className="commentHead">
          <div className="commentName">
            {input ? user.username : comment?.author?.username}
          </div>
          {!input && (
            <div className="commentTime">
              <TimeAgo timestamp={comment.createdAt} />
            </div>
          )}
        </div>
        <div className="commentBody">
          {input ? (
            <input
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
              placeholder="Write something"
            />
          ) : (
            editComment ?  <div className ="editCommentInput">
              <input value ={comment.comment}/>
              <button onClick = {()=>{}}>Save</button>
              <button onClick = {()=>{setEditComment(false)}}>Cancel</button>
              </div> : comment.comment 
          )}
        </div>
      </section>
      {input && (
        <section>
          <button className="commentBtn" onClick={() => addNewComment()}>
            ADD
          </button>
        </section>
      )}
      {!input && compare(comment.author._id,user._id) && (
        !editComment && <EditPostButton
          setEditForm={setEditForm}
          comment={comment}
          editForm={editForm}
          editcomment = {editComment}
          setEditComment ={setEditComment}
        />
      )}
    </section>
  );
}

export default CommentCard;
