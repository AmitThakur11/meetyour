import React from 'react'

import "./style.css"
import UserImg from "../../media/user.jpg"
import SideMenuBtn from '../sideMenuBtn/index'

function SideBarLeft() {
    return (
        <section className ="sideBar bar-one">
        <img  src = {UserImg} alt ="user_pic"/>
        <div className ="sideBar">
            <SideMenuBtn name ="home"/>
            <SideMenuBtn name ="home"/>
            <SideMenuBtn name ="home"/>
            <SideMenuBtn name ="home"/>
            <SideMenuBtn name ="home"/>
            <SideMenuBtn name ="home"/>

        </div>
    </section>
    )
}

export default SideBarLeft
