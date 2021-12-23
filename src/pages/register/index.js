import './style.css';
import FormInput from '../../component/formInput/index';
import RegisterImg from  "../../media/register.png";
import {Link} from 'react-router-dom'
// import {getUser} from "../../features/user/userSlice"
import {register} from "../../features/user/userSlice"
import {useState} from 'react'
import { useNavigate } from 'react-router';
import {useDispatch} from "react-redux"
function Register() {
  document.title ='Register';
  const [userInput , setUserInput] = useState({
    username : "",
    email : "",
    dateOfBirth : "",
    password : "",
    cpassword : ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      name  : "password",
      placeholder : "Password",
      type:"password",
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

  const userInputOnChange = (e)=>{
    const {name ,value} = e.target ;
    console.log(userInput)
    setUserInput((input)=>{
      return {...input , [name] : value}
    })

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    await dispatch(register(userInput))
    navigate("/")

  }
  return (
    <div className="register">
        
        <div className ="sideImage">
            <img src ={RegisterImg} alt="register"/>
        </div>
        <div className="formWrapper">
      <form onSubmit={handleSubmit} >
          
      <h1 className ="formTitle">Register</h1>
      {

        inputFieldData.map((input)=>{
          return <FormInput input ={input} onChange = {userInputOnChange} />
        })
      }
      
      <button className ="authBtn" type="submit">Register</button>
      <div className ="authFooter">Already having a account <Link to ="/login"><span>Clik here</span></Link></div>
      </form>
      </div>
    </div>
  );
}

export default Register;
