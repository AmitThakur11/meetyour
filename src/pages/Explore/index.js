import "./style.css"
import {useEffect} from "react"
import {useSelector , useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import Loader from "../../component/loader"
import { allUsers } from "../../features/user/userSlice"
export function ExploreCard({user,...props}){
    return(
        <div className ="exploreCard">
            <Link to ={`/profile/${user._id}`}><img className ="ec__img" src={user.displayPic} alt ="userDisplay"/>
            <div className ="ec__name">{user.username}</div>
            </Link>
            <div className ="ec__btn"><button className ="ec__followBtn">Follow</button></div>
        </div>
    )
}


export default function Explore(){
    const {otherUsers,status} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    
    
    useEffect(() => {
        (async()=>{
            await dispatch(allUsers())
        })()
    },[dispatch])
    return(
        <div className ="explorePage">
            {status === "loading" && <Loader/>}
            {status === "success" && <div className ="exploreList">
            {
                otherUsers?.map((user)=>{
                    return(
                        <div className = "exploreCard__wrapper">
                        <ExploreCard user ={user}/>
                        </div>
                    )

                })
            }
            
            
            </div>
}

        </div>
    )
}