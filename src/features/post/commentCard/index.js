import React, {useState} from 'react'
import "./style.css"
import {useSelector , useDispatch} from "react-redux";
import {addComment} from "../postSlice"
import TimeAgo from '../timeAgo';
function CommentCard(props) {
    const {user} = useSelector((state)=>state.user)
    const {input,comment,post , style} = props
    const [commentText,setCommentText] = useState("")
    const dispatch = useDispatch();
    return (
        <section className ="commentWrapper" style ={style}>

            <div>
                <img src ={input ? user.displayPic : comment?.author?.displayPic} alt ="/"/>
            </div>
            <section className ="commentDetail" >
                <div className ="commentHead">
                    <div className ="commentName">{input ? user.username : comment?.author?.username}</div>
                    {!input && <div className ="commentTime">
                    <TimeAgo
            timestamp={comment.createdAt}
            style={{ color: "red", fontSize: "14px" }}
          /></div>}
                </div>
                <div className ="commentBody">{
                    input ? <input onChange={(e)=>{
                        console.log(e.target.value)
                        setCommentText(e.target.value)
                    }} placeholder = "Write something"/>: comment.comment
                }</div>
            </section>
            {input && <section>
            <button className="commentBtn"  onClick = {()=>dispatch(addComment({postId : post._id,commentText : commentText}))
            } >ADD</button>

            </section>
}
            
        </section>
    )
}

export default CommentCard
