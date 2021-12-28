import './style.css';
import {FormInput} from '../../component';
import RegisterImg from  "../../media/register.png";
import {useState} from 'react';
import {useDispatch} from "react-redux"
import {useNavigate,Link} from "react-router-dom"
import {inputFieldData , userInputOnChange , handleSubmit , guestLogin} from "./utils"


export default function Login() {
  document.title ='login';
  const navigate = useNavigate()
  const [userInput , setUserInput] = useState({
    email : "",
    password : ""
  })
  const dispatch = useDispatch()
  

  return (
    <div className="login">
        <div className ="sideImage">
            <img src ={RegisterImg} alt="register"/>
        </div>
        <div className="formWrapper">
          <div className ="form">
      <form onSubmit={(e)=>handleSubmit(e,dispatch,navigate,userInput)} >
      <h1 className ="formTitle">Login</h1>
      {

        inputFieldData.map((input)=>{
          return <FormInput input ={input} onChange = {(e)=>userInputOnChange(e,setUserInput)} />
        })
      }
      
      <button className ="authBtn" type="submit">Login</button>
      <div className ="authFooter">New to the club <Link to ="/register"><span>Clik here</span></Link></div>
      </form>
      <button className ="authBtn" onClick={()=>guestLogin(dispatch , navigate)}>Login as guest</button>
      </div>
      
      </div>
    </div>
  );
}
