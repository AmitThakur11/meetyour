import "./style.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostReaction from "../../features/post/postReaction";
import CommentSection from "../../features/post/commentSection";
import { useParams, useNavigate ,Link} from "react-router-dom";
import Loader from "../../component/Loader";
import { IoMdTrash } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { editPost } from "../../features/post/postSlice";
import { deletePost } from "../../features/user/userSlice";
import LikeList from "../../component/LikeList";
import axios from "axios";

export function EditPostButton({ setEditForm, post, ...props }) {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="editPost__section">
      <label onClick={() => setEdit(!edit)}>
        <HiOutlineDotsVertical />
      </label>

      {edit && (
        <div className="editPost__modal">
          <label
            onClick={async () => {
              setEdit(false);
              await dispatch(deletePost(post._id));
              navigate("/");
            }}
          >
            <IoMdTrash /> Delete
          </label>
          <label
            onClick={() => {
              setEdit(false);
              setEditForm(true);
            }}
          >
            <AiFillEdit /> Edit
          </label>
        </div>
      )}
    </section>
  );
}

function PostEditForm({ post, setEditForm, ...props }) {
  const [captionText, setCaptionText] = useState(post.caption);
  const dispatch = useDispatch();

  return (
    <section className="postEdit__form">
      <textarea
        placeholder="edit caption..."
        value={captionText}
        onChange={(e) => setCaptionText(e.target.value)}
      />
      <div className="postEdit__btn">
        <button
          onClick={() => {
            dispatch(editPost({ caption: captionText, postId: post._id }));
            setEditForm(false);
          }}
        >
          Save
        </button>
        <button onClick={() => setEditForm(false)}>Cancel</button>
      </div>
    </section>
  );
}
function ShowPost() {
  const [displayComment, setDisplayComment] = useState({
    inputComment: true,
    commentQty: 1,
  });
  const {user} = useSelector((state)=>state.user)
  const [editForm, setEditForm] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [postLikes, setPostLikes] = useState({});
  const [post, setPost] = useState({});
  const { posts } = useSelector((state) => state.post);
  const [loader, setLoader] = useState(true);
  const { postId } = useParams();
  const isAdmin = (id1,id2)=>id1===id2
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await axios.get(`/post/${postId}`);
        setPost(response.data.data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    })();
  }, [postId, posts]);
  return (
    <div className="showPost">
      {loader ? (
        <Loader />
      ) : (
        <div className="showPost__wrapper">
          {editForm && <PostEditForm post={post} setEditForm={setEditForm} />}

          <img className="sP__postImg" src={post?.media[0]} alt="posts" />
          <div className="sP__postDetail">
            <div className="sP__userDetail">
              <img
                className="sP__userPic"
                src={post?.author.displayPic}
                alt="user"
              />
              <p className="sP__username"><Link to={`/profile/${post.author._id}`}>@{post?.author.username}</Link></p>
              { isAdmin(post.author._id,user._id) && (
                <div className="postEdit__wrapper">
                  <EditPostButton setEditForm={setEditForm} post={post} />
                </div>
              )}
            </div>
            <div className="sP__Caption">{post?.caption}</div>
            <PostReaction
              post={post}
              setDisplayComment={setDisplayComment}
              setPostLikes={setPostLikes}
              setShowLikes={setShowLikes}
            />
            {showLikes && <LikeList show={setShowLikes} data={postLikes} />}
            <CommentSection
              displayComment={displayComment}
              post={post}
              setDisplayComment={setDisplayComment}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowPost;
