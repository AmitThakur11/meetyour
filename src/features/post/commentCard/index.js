import React, { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { addComment ,editComment} from "../postSlice";
import TimeAgo from "../timeAgo";
import {compare} from "../../../utils/function"
import {EditPostButton} from "./editPostBtn"


function CommentCard(props) {
  const { user } = useSelector((state) => state.user);
  const { input, comment, post, style } = props;
  const [commentText, setCommentText] = useState("");
  const [editedComment,setEditedComment] = useState(null)
  const [editForm, setEditForm] = useState(false);
  const [editOldComment ,setEditOldComment] = useState(false)
  const dispatch = useDispatch();
  const addNewComment = () => {
    setEditOldComment(false)
    if(commentText === ""){
      return setEditedComment(comment.comment)
    }
    dispatch(addComment({ postId: post._id, commentText: commentText }));
    setCommentText("");
  };

  const editingComment =()=>{
    
    if(editedComment === null || editedComment === ""){
      setEditOldComment(false)
      return
    }
    
    dispatch(editComment({postId : post._id, commentId : comment._id , newComment : editedComment}))
    setEditOldComment(false)
  }

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
            editOldComment ?  <div className ="editCommentInput">
              <input value ={editedComment} placeholder={comment.comment} onChange={(e)=>setEditedComment(e.target.value)}/>
              <button onClick = {()=>editingComment()}>Save</button>
              <button onClick = {()=>{setEditOldComment(false)}}>Cancel</button>
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
        !editOldComment && <EditPostButton
          setEditForm={setEditForm}
          comment={comment}
          editForm={editForm}
          editOldcomment = {editOldComment}
          setEditOldComment ={setEditOldComment}
        />
      )}
    </section>
  );
}

export default CommentCard;
