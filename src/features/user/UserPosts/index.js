
import {Link} from "react-router-dom"
import "./style.css"
function UserPost(props) {
    const {post} = props
    
    return (
                    <div className ="pd__postContainer">
                        {post?.length  === 0&& <h1>No post</h1>}
                    
                        {
                            post?.map((postImage)=>{
                                return <Link to ={`/post/${postImage._id}`} key ={postImage._id}><img   className ="userPostImg" src ={postImage.media[0]} alt="post"/></Link>
                                    
                            })
                        }

                    
                    
                    </div>
    )
}

export default UserPost
