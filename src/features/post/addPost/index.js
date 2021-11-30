import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import UserImg from "../../../media/user.jpg";
import axios from "axios";
import "./style.css";
function AddPost() {
  const [imgData, setImgData] = useState([]);
  const [preview, setpreview] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

  const uploadImage = async () => {
    for (let i = 0; i < imgData.length; i++) {
      const formData = new FormData();
      formData.append("file", imgData[i]);
      formData.append("upload_preset", "z0t3ezb4");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dexterology/image/upload",
          formData
        );
        console.log(response.data.url);
        setImgUrl((imgUrl) => {
          return [...imgUrl, response.data.url];
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const previewImg = (file) => {
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onloadend = () => {
        setpreview((img) => {
          return [...img, reader.result];
        });
      };
    }
  };

  const removePreview = (img)=>{
    const filteredPreview = preview.filter((item)=>item !== img);
    setpreview(filteredPreview)
}

  return (
    <section className="addPost__section">
      <section className="addPost__wrapper">
        <div className="userPhoto">
          <img src={UserImg} alt="profilepic" />
        </div>
        <div className="inputPost__section">
          <textArea placeholder="What's on your mind"></textArea>
          <div className="imagePreview">
            {preview.length > 0 &&
              preview.map((img) => {
                return (
                  <div className="preview">
                    <div className="cancelPreview" onClick ={()=>removePreview(img)}>
                           
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
                previewImg(e.target.files);
              }}
              multiple
              accept="image/*"
            />

            <button className="postBtn" onClick={() => uploadImage()}>
              POST
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default AddPost;
