import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { deleteComment } from "../postSlice";
export function EditPostButton({ setEditForm, comment, setEditComment, ...props }) {
    const [edit, setEdit] = useState(false);
  
    const dispatch = useDispatch();
    const removeComment = () => {
      setEdit(false);
      dispatch(deleteComment({ postId: comment.post, commentId: comment._id }));
    };
    return (
      <section className="editPost__section">
        <label onClick={() => setEdit(!edit)}>
          <HiOutlineDotsVertical />
        </label>
  
        {edit && (
          <div className="editPost__modal">
            <label onClick={() => removeComment()}>
              <IoMdTrash /> Delete
            </label>
            <label
              onClick={() => {
                setEdit(false);
                setEditForm(false);
                setEditComment(true)
              }}
            >
              <AiFillEdit /> Edit
            </label>
          </div>
        )}
      </section>
    );
  }