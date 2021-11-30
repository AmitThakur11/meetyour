import "./style.css"
import UserImg from "../../../media/user.jpg"
import PostImg from "../../../media/post.png"
import { IoHeartOutline , IoHeartSharp ,IoChatbubbleOutline , IoBookmarkOutline} from "react-icons/io5";
import React from 'react'
import CommentSection from "../commentCard/index";

function PostCard() {
    return (
        <div className ="postCard">
            <section className ="postHeader">
                <div className ="userDetail">
                    <img src={UserImg} alt="userimg"/>
                    <div>@i.m.Dexter</div>

                </div>
                
            </section>
            <section className ="postMedia">
                <img src={PostImg} alt ="post"/>
            </section>
            <section className ="postReaction">
                <section className ="postReaction__wrapper">
                    <div className ="reaction">
                        <label><IoHeartOutline/></label>
                        <div className ="count">0</div>
                    </div>
                    <div className ="reaction">
                        <label><IoChatbubbleOutline/></label>
                        <div className ="count">0</div>
                    </div>
                    <div className ="reaction">
                        <label><IoBookmarkOutline/></label>
                    </div>
                </section>


            </section>
            <section className ="captionContainer">
                <div className="caption">
                    A happ day to remember

                </div>

            </section>
            <section className ="commentInput">
                <CommentSection input />
                
            </section>
            <section className ="comment">
            <CommentSection/>
            </section>
            <section className ="comment">
            <CommentSection/>
            </section>
            <section className ="comment">
            <CommentSection/>
            </section>
        </div>
    )
}

export default PostCard
