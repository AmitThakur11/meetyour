import "./style.css";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import PostReaction from "../../features/post/postReaction";
import CommentSection from "../../features/post/commentSection";
import { useParams } from "react-router-dom";
import Loader from "../../component/loader";
import { IoMdTrash } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { editPost } from "../../features/post/postSlice";


export function EditPostButton({ setEditForm,...props }) {
  const [editPost , setEditPost] = useState(false);
  return (
    <section className="editPost__section">
      <label onClick={() => setEditPost(!editPost)}>
        <HiOutlineDotsVertical />
      </label>

      {editPost && (
        <div className="editPost__modal">
          <label onClick={()=>{
            setEditPost(false)
          }}>
            <IoMdTrash /> Delete
          </label>
          <label onClick={()=>{
            setEditPost(false)
            setEditForm(true)
          }}>
            <AiFillEdit /> Edit
          </label>
        </div>
      )}
    </section>
  );
}


function PostEditForm({post , setEditForm,...props}){
  const [captionText , setCaptionText] = useState(post.caption)
  const dispatch = useDispatch()

  return (
    <section className="postEdit__form">
              <textarea placeholder="edit caption..." value = {captionText} onChange={(e)=>setCaptionText(e.target.value)} />
              <div className ="postEdit__btn">
                <button onClick = {()=>{
                  console.log(post._id)
                  dispatch(editPost({caption : captionText,postId : post._id}))
                  setEditForm(false)
                }}>Save</button>
                <button onClick= {()=>setEditForm(false)}>Cancel</button>

              </div>
              
            </section>
  )
}
function ShowPost() {
  const [displayComment, setDisplayComment] = useState({
    inputComment: true,
    commentQty: 1,
  });
  const [editForm , setEditForm] = useState(false)
  const { posts, status } = useSelector((state) => state.post);
  const { postId } = useParams();
  const post = posts.find(({ _id }) => _id === postId);

  return (
    <div className="showPost">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <>
          {" "}
          <div className="showPost__wrapper">
            {editForm && <PostEditForm post = {post} setEditForm= {setEditForm}/>}
            
            <img className="sP__postImg" src={post.media[0]} alt="posts" />
            <div className="sP__postDetail">
              <div className="sP__userDetail">
                <img
                  className="sP__userPic"
                  src={post.author.displayPic}
                  alt="user"
                />
                <p className="sP__username">@{post.author.username}</p>
                <div className="postEdit__wrapper">
                  <EditPostButton
                    setEditForm={setEditForm}
                  />
                </div>
              </div>
              <div className="sP__Caption">{post.caption}</div>
              <PostReaction post={post} setDisplayComment={setDisplayComment} />
              <CommentSection
                displayComment={displayComment}
                post={post}
                setDisplayComment={setDisplayComment}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowPost;
