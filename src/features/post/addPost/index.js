import React from 'react'
import { FaRegImage} from 'react-icons/fa'
import UserImg from "../../../media/user.jpg"
import "./style.css";
function AddPost() {
    return (
        <section className ="addPost__section">
            <section className ="addPost__wrapper">
            <div className ="userPhoto">
                <img   src={UserImg} alt="profilepic" />
                {/* <input  id ="selectImg" type="file" /> */}
            </div>
            <div className ="inputPost__section">
                <textArea placeholder ="What's on your mind"></textArea>
                <div className ="imagePreview">

                </div>
            <div className ="inputPost__btn">
            <label htmlFor ="imageInput">
            <FaRegImage/>
            </label>
            <input type ="file" id ="imageInput" accept ="image/*"/>
                
                <button className ="postBtn">POST</button>
            </div>
                
            </div>
            
            </section>
        </section>
    )
}

export default AddPost
