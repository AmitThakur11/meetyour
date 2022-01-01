import React from 'react'
import {useSelector} from "react-redux"
import "./style.css"
import SideMenuBtn from '../SideMenuBtn/index'

import {RiUserFollowLine , RiImageLine , RiBookmarkLine} from 'react-icons/ri'
import {Link} from "react-router-dom"
function SideBarLeft({on}) {
    let {user,status} =  useSelector((state)=>state.user);

    return (
        <section className = {on?"leftSideBar__container bar-one barOn":"leftSideBar__container bar-one"}>
        <Link to = {`/profile/${user._id}`} >{status==="success"?<img  className ="leftSideBar__img" src = {user.displayPic} alt ="user_pic"/>:<div className ="leftSideBar__img"></div>}</Link>
        <div className ="leftSideBar">
            <SideMenuBtn name ="Followers" icon = {<RiUserFollowLine/>} route ="/followers"/>
            <SideMenuBtn name ="Following" icon = {<RiUserFollowLine/>} route = "/following"/>
            <SideMenuBtn name ="Post" icon = {<RiImageLine/>} route = "/posts"/>
            <SideMenuBtn name ="Saved" icon = {<RiBookmarkLine/>} route = "/saved"/>
           

        </div>
    </section>
    )
}

export default SideBarLeft
