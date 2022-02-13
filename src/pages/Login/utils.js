import {login} from "../../features/user/userSlice";

export const inputFieldData = [
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

  export   const userInputOnChange = (e,setUserInput)=>{
    const {name ,value} = e.target ;
    setUserInput((input)=>{
      return {...input , [name] : value}
    })

  }

  export const handleSubmit = async(e,dispatch,navigate,userInput)=>{
    e.preventDefault();
    await dispatch(login(userInput))
    navigate("/")
    
  }

  export const guestLogin = async(dispatch,navigate)=>{
    await dispatch(login({email : "dexter@gmail.com",
    password : "thakur@54321"}))
    navigate("/")

  }