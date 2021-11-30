import React from 'react'
import "./style.css"
import UserImg from "../../media/user.jpg"
function FollowCard() {
    return (
        <section className ="followCard">
            <img src={UserImg} alt="user_img"/>
            <section className ="followCard__detail">
                <div className ="followCard__name">@i.m.Dexter</div>
                <div>
                    <button className ="followCard__btn">Follow</button>
                </div>

            </section>
            
        </section>
    )
}

export default FollowCard
