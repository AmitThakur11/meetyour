import "./style.css"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
function UserSavePost() {
    const {user} = useSelector((state)=>state.user)
    const {posts} = useSelector((state)=>state.post)
    return (
        <div className ="userSaved__post">
            {
                posts.map((post)=>{
                    return user?.savePost.includes(post._id)&& 
                        <Link to = {`/post/${post._id}`}><div className ="userSaved__postImg" >
                            <img src= {post.media[0]} alt="post"/></div></Link>
                    
                })
            }
        </div>
    )
}

export default UserSavePost
