import React from 'react'
import "./style.css"
function SideMenuBtn(props) {
    return (
        <button className ="sideMenu__btn"><span className ="sideMenu_icon">{props.icon} </span> {props.name}</button>
    )
}

export default SideMenuBtn
