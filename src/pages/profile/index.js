import React from 'react'
import "./style.css"
// import Post from "../../media/post.png"
import UserImg from "../../media/user.jpg"
import { RiEditLine , RiCamera3Line} from "react-icons/ri";
import {Routes,Route,Link} from "react-router-dom"

import ProfileButton from "../../features/user/ProfileButton/index"
import About from '../../features/user/about';
import UserPost from '../../features/user/userPosts';
import Follower from '../../features/user/followers';
import Following from '../../features/user/following';
function Profile() {
    return (
        <section className ="profileLayout">
           <section className ="profileLayout__wrapper">
            <div className ="profileHeader__img">
                <div className ="pd__img">
                <img src ={UserImg} at ="/"/>
                <div className ="pd__imgEditBtn"><RiCamera3Line/></div>
                </div>
                <div className = "pd__Name"><span>@</span>i.m.Dexter</div>
            </div>
            <div className ="profileHeader__detail">
                <div className ="profileBio">
                    <p>23' , on the way to become a Fullstack developer</p>
                    <a href ="http://localhost:3000"><span>Website : </span>http://localhost:3000</a>
                </div>
            <div className="profileButton__wrapper">
                <Link to ="/about"><ProfileButton name ="About"/></Link>
                <ProfileButton name ="Post(3)"/>
                <ProfileButton name ="Followers(1M)"/>
                <ProfileButton name ="Following(0)"/>
            </div>
            </div>
            
           </section>
           <div className ="profileData">
                <div className ="profileData__wrapper">
                    <Routes>
                    <Route path ="/" element ={<UserPost/>}/>
                    <Route path ="/profile/about" element ={<About/>}/>
                    <Route path ="/follower" element ={<Follower/>}/>
                    <Route path ="/following" element ={<Following/>}/>
                    </Routes>
                </div>

            </div>
            
        </section>
    )
}

export default Profile



// <div className ="about">
//                     <div className = "about">On the way to become a Full stack deveoper.</div>
//                     <a href ="http://localhost:3000"> http://localhost:3000</a>
//                 </div>
            