import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"
function SideMenuBtn(props) {
    return (
        <Link to ={props.route}><button className ="sideMenu__btn"><span className ="sideMenu_icon">{props.icon} </span> {props.name}</button></Link>
    )
}

export default SideMenuBtn
