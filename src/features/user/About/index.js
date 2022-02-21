import { useState } from "react";
import "./style.css";
import {useDispatch , useSelector} from 'react-redux'
import { RiEditLine , RiCloseCircleFill} from "react-icons/ri";
import {editProfile} from "../userSlice"
import Loader from "../../../component/Loader"
function About(props) {
  const {profile,isAdmin } = props;
  const dispatch = useDispatch();
  const {user,status}= useSelector((state)=>state.user)
  const {username , email , dateOfBirth,bio,website} = profile;
  

  const initialData = {
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    bio: user.bio,
    website: user.website,
  }
  const [userInput, setUserInput] = useState(initialData);
  const [edit , setEdit] = useState(false)

  

  const userInputOnChange = (e) => {
    console.log("profile",profile);
    console.log("user",user)
    const { name, value } = e.target;
    
    setUserInput((input) => {
      return { ...input, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false)
    dispatch(editProfile(userInput));
  };

  return (
    <>
    {status === "loading" && <Loader/>}
    {
      status === "success" && <div className="pd__aboutContainer">
      {edit && <div className="editAbout__form">
        
        <form onSubmit ={handleSubmit}>
        <label className ="cancelEdit" onClick ={()=>setEdit(false)}>
        <RiCloseCircleFill/>
          </label>
          <input name ="username" value ={userInput.username} className ="editInput" onChange = {(e)=>userInputOnChange(e)} />
          <input name ="email" value ={userInput.email} className ="editInput" onChange = {(e)=>userInputOnChange(e)} />
          <input name ="dateOfBirth" type ="date" value ={userInput.dateOfBirth} className ="editInput" onChange = {(e)=>userInputOnChange(e)} />
          <textarea name ="bio" value ={userInput.bio} className ="editTextarea" onChange = {(e)=>userInputOnChange(e)} />
          <input name ="website" value ={userInput.website} className ="editInput" onChange = {(e)=>userInputOnChange(e)} />
          <button className ="saveEdit__btn" type="submit">Save</button>
        </form>
        
      </div>}
      <div className="aboutContainer__wrapper">
        <div className="aboutItem">
          Username<div>{username}</div>
        </div>
        <div className="aboutItem">
          Email<div>{email}</div>
        </div>
        <div className="aboutItem">
          Bio<div>{bio}</div>
        </div>
        <div className="aboutItem">
          D.O.B<div>{dateOfBirth}</div>
        </div>
        <div className="aboutItem">
          Website<div>{website}</div>
        </div>
        {isAdmin && (
          <div className="pd__editBtn" onClick={()=>setEdit(!edit)}>
            <RiEditLine />
          </div>
        )}
      </div>
      
    </div>
}</>
  );
}

export default About;
