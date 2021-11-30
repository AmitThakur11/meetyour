import React from 'react'
import "./style.css"
function SideMenuBtn(props) {
    return (
        <button className ="sideMenu__btn">{props.name}</button>
    )
}

export default SideMenuBtn
