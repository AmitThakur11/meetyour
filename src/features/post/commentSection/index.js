// import { useState } from "react";
import CommentCard from "../commentCard";

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
  // const [commentList, setCommentList] = useState(false);

  return (
    <>
      <div
        style={{ color: "grey", fontStyle: "italic", margin: "5px" }}
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
              <section className="comment">
                <CommentCard comment={comment} />
              </section>
            );
          })}
          <div style={{ margin: "5px" }} >
            
               {post.comments.length > displayComment.commentQty && displayComment.commentQty > 0 && <div onClick={() => moreComment()}>show more</div>}
       
              {post.comments.length <= displayComment.commentQty && <div onClick={() => hideComment()}>hide comments</div>}
            
          </div>
        </>
      )}
    </>
  );
}

export default CommentSection;
