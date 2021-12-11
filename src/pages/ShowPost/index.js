import "./style.css"
import {useState} from "react"
import {useSelector} from "react-redux"
import PostReaction from "../../features/post/postReaction"
import CommentSection from "../../features/post/commentSection"
import {useParams} from "react-router-dom"
import Loader from "../../component/loader"
function ShowPost() {
    const [displayComment , setDisplayComment] =  useState({inputComment : true , commentQty : 1})
    const {posts , status} = useSelector((state)=>state.post)
    const {postId} = useParams();
    const post = posts.find(({_id})=>_id === postId);
    console.log(post)
    return (
        <div className ="showPost">
            {status ==="loading" && <Loader/>}
           { status ==="success" &&  <> <div className ="showPost__wrapper">
            <img className ="sP__postImg" src ={post.media[0]} alt ="posts" />
            <div className ="sP__postDetail">
                <div className ="sP__userDetail">
                    <img  className ="sP__userPic"src={post.author.displayPic}alt="user"/>
                    <p className="sP__username">@i.am.Dexter</p>
                </div>
                <div className="sP__Caption">
                    kuch toh h 

                </div>
                <PostReaction post ={post} setDisplayComment={setDisplayComment}/>
                <CommentSection displayComment = {displayComment} post ={post} setDisplayComment={setDisplayComment}/>


            </div>
        </div>
        </>
        }
        </div>
    )
}

export default ShowPost
