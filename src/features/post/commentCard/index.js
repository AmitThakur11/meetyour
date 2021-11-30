import React from 'react'
import "./style.css"
import UserImg from "../../../media/user.jpg"
function CommentSection( props) {
    return (
        <section className ="commentWrapper">
            <div>
                <img src ={UserImg} alt ="/"/>
            </div>
            <section className ="commentDetail">
                <div className ="commentHead">
                    <div className ="commentName">@i.m.Dexter</div>
                    {!props.input && <div className ="commentTime">7 minutes ago</div>}
                </div>
                <div className ="commentBody">{
                    props.input ? <input placeholder = "Write something"/>:"nice pic bro"
                }</div>
            </section>
            {props.input && <section>
            <button>ADD</button>

            </section>
}
            
        </section>
    )
}

export default CommentSection
