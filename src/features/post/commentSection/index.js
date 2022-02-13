// import { useState } from "react";
import CommentCard from "../commentCard";
import "./style.css"
function CommentSection(props) {
  const { displayComment, post, setDisplayComment } = props;
  const moreComment = () =>
    setDisplayComment((comment) => {
      return { ...comment, commentQty: comment.commentQty + 2 };
    });
    const hideComment = () =>
    setDisplayComment((comment) => {
      return { ...comment, commentQty: 1 };
    });

  return (
    <>
      <div
        className ="showComments"
        onClick={() => setDisplayComment((comment)=>{
            return {...comment, commentQty : 1 , inputComment :!comment.inputComment}
        })}
      >
        Comments {post.comments.length}
      </div>

      {displayComment.inputComment && (
        <>
          <section className="commentInput">
            <CommentCard
              input
              post={post}
              style={{ border: "1px solid black" }}
            />
          </section>

          {post.comments.slice(0, displayComment.commentQty).map((comment) => {
            return (
              <section key ={comment._id} className="comment">
                <CommentCard comment={comment} post ={post} />
              </section>
            );
          })}
          <div  className="showComments"  >
            
               {post.comments.length > displayComment.commentQty && displayComment.commentQty > 0 && <div onClick={() => moreComment()}>show more</div>}
       
              {post.comments.length !== 0 && (post.comments.length < displayComment.commentQty) && <div onClick={() => hideComment()}>hide comments</div>}
            
          </div>
        </>
      )}
    </>
  );
}

export default CommentSection;
