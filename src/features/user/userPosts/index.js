import React from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

function UserPost(props) {
    const {user} =props
    
    return (
                    <div className ="pd__postContainer">
                        
                        {
                            user.post.map((postImage)=>{
                                return <Link to ={`/post/${postImage._id}`}><img  className ="userPostImg" src ={postImage.media[0]} alt="post"/></Link>
                                    
                            })
                        }

                    
                    
                    </div>
    )
}

export default UserPost
