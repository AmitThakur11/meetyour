import { useState } from "react";
import "./style.css";
import {useDispatch , useSelector} from 'react-redux'
import { RiEditLine , RiCloseCircleFill} from "react-icons/ri";
import {editProfile} from "../userSlice"
import Loader from "../../../component/Loader"
function About(props) {
  const { user, isAdmin } = props;
  const dispatch = useDispatch();
  const {status}= useSelector((state)=>state.user)
  const {username , email , dateOfBirth,bio,website} = user;
  

  const initialData = {
    username: username,
    email: email,
    dateOfBirth: dateOfBirth,
    bio: bio,
    website: website,
  }
  const [userInput, setUserInput] = useState(initialData);
  const [edit , setEdit] = useState(false)

  

  const userInputOnChange = (e) => {
    const { name, value } = e.target;
    console.log(userInput);
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
          Username<div>{user.username}</div>
        </div>
        <div className="aboutItem">
          Email<div>{user.email}</div>
        </div>
        <div className="aboutItem">
          Bio<div>{user.bio}</div>
        </div>
        <div className="aboutItem">
          D.O.B<div>{user.dateOfBirth}</div>
        </div>
        <div className="aboutItem">
          Website<div>{user.website}</div>
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
