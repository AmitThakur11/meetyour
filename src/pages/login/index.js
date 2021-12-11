import './style.css';
import FormInput from '../../component/formInput/index';
import RegisterImg from  "../../media/register.png";
import {useState} from 'react';
import {login} from "../../features/user/userSlice";
import {useDispatch} from "react-redux"
import {useNavigate,Link} from "react-router-dom"
function Login() {
  document.title ='login';
  const navigate = useNavigate()
  const [userInput , setUserInput] = useState({
    email : "",
    password : ""
  })
  const dispatch = useDispatch()
  // const isLogin = useSelector(state => state.user.login)
  const inputFieldData = [
    {
      id : 1,
      name  : "email",
      placeholder : "Email",
      type : "email",
      label : "Email",
      required : true,
      errorMsg : "It should be a valid email address !"
    },
    {
      id :2,
      name  : "password",
      placeholder : "Password",
      type:"password",
      label : "Password",
      pattern : `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,20}$`,
      required : true,
      errorMsg:"Password should be atleast 8-20 character long and include 1 letter , 1 number and 1 special character !"
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
    await dispatch(login(userInput))
    navigate("/")
    
  }
  return (
    <div className="login">
        <div className ="sideImage">
            <img src ={RegisterImg} alt="register"/>
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
      <div className ="authFooter">New to the club<Link to ="/register"><span>Clik here</span></Link></div>
      
      </form>
      </div>
    </div>
  );
}

export default Login;
