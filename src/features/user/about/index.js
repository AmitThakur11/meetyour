import {useState} from 'react'
import "./style.css"
// import {useSelector} from 'react-redux'
import {RiEditLine} from "react-icons/ri"
import FormInput from "../../../component/formInput"
function About(props) {
    const {user , isAdmin}= props;
    const [userInput , setUserInput] = useState({
        username : "",
        email : "",
        dateOfBirth : "",
        bio : "",
        website : ""
      })


      const inputFieldData = [
        {
          id : 1 ,
          name  : "username",
          placeholder : "Username",
          type : "text",
          label : "Username",
          required : true,
          pattern : "^[A-Za-z0-9]{3,16}$",
          errorMsg : "username should be 3-16 character and shouldn't include any special character !"
        },
        {
          id : 2,
          name  : "email",
          placeholder : "Email",
          type : "email",
          label : "Email",
          required : true,
          errorMsg : "It should be a valid email address !"
        },
        {
          id :3,
          name  : "dateOfBirth",
          placeholder : "dd-mm-yy",
          type:"Date",
          label : "Birthday"
          
        },
        {
          id :4,
          name  : "D.O.B",
          placeholder : "D.O.B",
          label : "Password",
          pattern : `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,20}$`,
          required : true,
          errorMsg:"Password should be atleast 8-20 character long and include 1 letter , 1 number and 1 special character !"
        },
        {
          id :5,
          name  : "cpassword",
          placeholder : "Confirm password",
          type : "password",
          label : "Confirm password",
          required : true,
          pattern : userInput.password,
          errorMsg:"Password doesn't match",
          
        },
    
      ]
    



    
    
    return (
        <div className = "pd__aboutContainer">
                    <div className = "aboutContainer__wrapper">
                        <div className="aboutItem">Username<div>{user.username}</div></div>
                        <div className="aboutItem">Email<div>{user.email}</div></div>
                        <div className="aboutItem">Bio<div>{user.bio}</div></div>
                        <div className="aboutItem">D.O.B<div>{user.dateOfBirth}</div></div>
                        <div className="aboutItem">Website<div>{user.website}</div></div>
                       {isAdmin && <div className ="pd__editBtn"><RiEditLine/></div>}
                    </div>
                    <div className ="editAbout__form">
                        <form>
                           
                        </form>



                    </div>
                      

                    </div>
    )
}

export default About
