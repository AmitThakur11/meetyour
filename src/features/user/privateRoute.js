import {Route} from "react-router-dom"
import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
// import Login from "../../pages/login"
const PrivateRoute = ({path,...props})=>{
    const {login} = useSelector((state)=>state.user)
    console.log("login",login)
    return login ? <Route path={path} {...props} />:<Navigate   state ={{from : path}} replace to ="/login"/>
}

export default PrivateRoute
