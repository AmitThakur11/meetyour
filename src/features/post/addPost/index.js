import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {useSelector , useDispatch} from "react-redux"
import "./style.css";
import {removePreview,previewImg} from "./functions"
import {addPost} from "../postSlice"
import { toast } from "react-toastify";
function AddPost() {
  const [imgData, setImgData] = useState([]);
  const [preview, setpreview] = useState([]);
  const [postData, setPostData] = useState({caption : "", media : []});
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch();  

  return (
    <section className="addPost__section">
      <section className="addPost__wrapper">
        <div className="userPhoto">
          <img src={user.displayPic} alt={imgData} />
        </div>
        <div className="inputPost__section">
          <textarea placeholder="What's on your mind" onChange ={(e)=>setPostData((postData)=>{
            return {...postData , caption : e.target.value}
          })}></textarea>
          <div className="imagePreview">
            {preview.length > 0 &&
              preview.map((img) => {
                return (
                  <div className="preview">
                    <div className="cancelPreview" onClick ={()=>removePreview(img ,setpreview , preview)}>
                           
                      <MdCancel />
                    </div>
                    <img width="100px" src={img} alt="preview" />
                  </div>
                );
              })}
          </div>
          <div className="inputPost__btn">
            <label htmlFor="imageInput">
              <FaRegImage />
            </label>
            <input
              type="file"
              id="imageInput"
              onChange={(e) => {
                setImgData(e.target.files);
                previewImg(e.target.files,setpreview);
              }}
              accept="image/*"
            />

            <button className="postBtn" onClick={() =>{
              const {caption} = postData;
              if(!caption){
                return toast.info("Need a caption !")
              }
              if(preview.length === 0){
                return toast.info("Empty media !")
              }
            
              dispatch(addPost({caption : postData.caption , media : preview }))

            }}>
              POST
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default AddPost;
