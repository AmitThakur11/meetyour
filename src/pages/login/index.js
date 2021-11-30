import './style.css';
import FormInput from '../../component/formInput/index';
import RegisterImg from  "../../media/register.png";
import {Link} from "react-router-dom"
import {useState} from 'react'
function Login() {
  document.title ='home';
  const [userInput , setUserInput] = useState({
    email : "",
    password : ""
  })

  const inputFieldData = [
    // {
    //   id : 1 ,
    //   name  : "username",
    //   placeholder : "Username",
    //   type : "text",
    //   // value : userInput.username,
    //   label : "Username",
    //   required : true,
    //   pattern : "^[A-Za-z0-9]{3,16}$",
    //   errorMsg : "username should be 3-16 character and shouldn't include any special character !"
    // },
    {
      id : 2,
      name  : "email",
      placeholder : "Email",
      type : "email",
      // value : userInput.email,
      label : "Email",
      required : true,
      errorMsg : "It should be a valid email address !"
    },
    // {
    //   id :3,
    //   name  : "dob",
    //   placeholder : "dd-mm-yy",
    //   type:"Date",
    //   // value : userInput.dob,
    //   label : "Birthday"
      
    // },
    {
      id :4,
      name  : "password",
      placeholder : "Password",
      type:"password",
      // value : userInput.password,
      label : "Password",
      pattern : `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,20}$`,
      required : true,
      errorMsg:"Password should be atleast 8-20 character long and include 1 letter , 1 number and 1 special character !"
    },
    // {
    //   id :5,
    //   name  : "cpassword",
    //   placeholder : "Confirm password",
    //   type : "password",
    //   // value : userInput.cpassword,
    //   label : "Confirm password",
    //   required : true,
    //   pattern : userInput.password,
    //   errorMsg:"Password doesn't match",
      
    // },

  ]

  const userInputOnChange = (e)=>{
    const {name ,value} = e.target ;
    console.log(userInput)
    setUserInput((input)=>{
      return {...input , [name] : value}
    })

  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(userInput)

  }
  return (
    <div className="login">
        <div className ="sideImage">
            <img src ={RegisterImg} alt="register image"/>
        </div>
        <div className="formWrapper">
      <form onSubmit={handleSubmit} >
      <h1 className ="formTitle">Login</h1>
      {

        inputFieldData.map((input)=>{
          return <FormInput input ={input} onChange = {userInputOnChange} />
        })
      }
      
      <button className ="authBtn" type="submit">Login</button>
      
      </form>
      </div>
    </div>
  );
}

export default Login;
