import React from 'react'
import {useSelector} from "react-redux"
import "./style.css"
import SideMenuBtn from '../sideMenuBtn/index'
import {MdOutlineQuiz} from 'react-icons/md'
import {AiOutlineShopping} from 'react-icons/ai'
import {BiCameraMovie} from 'react-icons/bi'
import {RiHome5Line ,RiUserFollowLine} from 'react-icons/ri'

function SideBarLeft({on}) {
    let {user} =  useSelector((state)=>state.user);

    return (
        <section className = {on?"leftSideBar__container bar-one barOn":"leftSideBar__container bar-one"}>
        <img  src = {user.displayPic} alt ="user_pic"/>
        <div className ="leftSideBar">
            <SideMenuBtn name ="Home" icon = {<RiHome5Line/>}/>
            <SideMenuBtn name ="Followers" icon = {<RiUserFollowLine/>}/>
            <SideMenuBtn name ="Following" icon = {<RiUserFollowLine/>}/>
            <SideMenuBtn name ="Shop" icon = {<AiOutlineShopping/>}/>
            <SideMenuBtn name ="Videos" icon = {<BiCameraMovie/>}/>
            <SideMenuBtn name ="Quiz" icon = {<MdOutlineQuiz/>}/>

        </div>
    </section>
    )
}

export default SideBarLeft
