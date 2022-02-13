
import "./style.css"
import {useNavigate} from "react-router-dom"
export default function EmptyArea({image,route}){
    const navigate = useNavigate()
    return(
        <div className ="emptyArea">
            <img className ="ea__image" src = {image} alt ="emptyimage" />
            <button className = "ea__btn" onClick = {()=>navigate(route)}>Explore</button>
        </div>
    )
}