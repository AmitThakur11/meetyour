import {useEffect} from 'react'
import FollowCard from '../FollowCard'
import {useDispatch,useSelector} from "react-redux"
import {allUsers} from "../../features/user/userSlice"
import {MdOutlineExplore } from "react-icons/md"
import "./style.css"

function SideBarRight({on}) {
    const dispatch = useDispatch();
    const {user,otherUsers} = useSelector(state => state.user);
    const followingId = user?.following?.map((otherUser)=>otherUser._id);
    const exploreUsers = otherUsers.map((otherUser)=>{
        if(!followingId?.includes(otherUser._id)&& otherUser._id !== user._id){
            return otherUser
        }
        return false
    })
    console.log(exploreUsers)
    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])


    return (
        <section className = {on?"rightSideBar bar-two barOn":"rightSideBar bar-two "} >
            <div className ="exploreSection">
            <MdOutlineExplore />
            </div>
            
        {
            exploreUsers?.map((others)=>{
                return   others && <FollowCard user={others}/>
            })
        }
        <button className ="exploreBtn">See more</button>
        
      
        

            
        </section>
    )
}

export default SideBarRight
