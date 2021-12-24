import React, { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../postSlice";
import TimeAgo from "../timeAgo";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import {deleteComment} from "../postSlice"


export function EditPostButton({ setEditForm,comment , ...props }) {
  // const {user} = useSelector(state => state.user)
  const [edit , setEdit] = useState(false);
  
  const dispatch = useDispatch()
  return (
    <section className="editPost__section">
      <label onClick={() => setEdit(!edit)}>
        <HiOutlineDotsVertical />
      </label>

      {edit && (
        <div className="editPost__modal">
          <label onClick={async()=>{
            

            setEdit(false)
            await dispatch(deleteComment({postId :comment.post, commentId : comment._id}))
            
          }}>
            <IoMdTrash /> Delete
          </label>
          <label onClick={()=>{
            setEdit(false)
            setEditForm(true)
          }}>
            <AiFillEdit /> Edit
          </label>
        </div>
      )}
    </section>
  );
}
function CommentCard(props) {
  const { user } = useSelector((state) => state.user);
  const { input, comment, post, style } = props;
  const [commentText, setCommentText] = useState("");
  // const [edit , setEdit] = useState(false)
  const [editForm ,setEditForm] = useState(false)
  console.log(editForm)
  const dispatch = useDispatch();
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
            comment.comment
          )}
        </div>
      </section>
      {input && (
        <section>
          <button
            className="commentBtn"
            onClick={() => {
              dispatch(
                addComment({ postId: post._id, commentText: commentText })
              );
              setCommentText("");
            }}
          >
            ADD
          </button>
          
        
        
          
        </section>
        
      )}
      {!input && (comment.author._id === user._id) && <EditPostButton setEditForm={setEditForm} comment ={comment}/>}
    </section>
  );
}

export default CommentCard;
