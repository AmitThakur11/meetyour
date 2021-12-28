import {useEffect} from 'react'
import FollowCard from '../FollowCard'
import {useDispatch,useSelector} from "react-redux"
import {allUsers} from "../../features/user/userSlice"
import {MdOutlineExplore } from "react-icons/md"
import "./style.css"
import { useNavigate } from 'react-router'

function SideBarRight({on}) {
    const dispatch = useDispatch();
    const {user,otherUsers} = useSelector(state => state.user);
    // const followingId = user?.following?.map((otherUser)=>otherUser._id);
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])


    return (
        <section className = {on?"rightSideBar bar-two barOn":"rightSideBar bar-two "} >
            <div className ="exploreSection">
            <MdOutlineExplore />
            </div>
            
        {
            otherUsers.map((others,index)=> index < 3 && others._id !== user._id && <FollowCard key={others._id} user={others}/>)
        }
        <button className ="exploreBtn" onClick = {()=>navigate("/explore")}>See more</button>
        
      
        

            
        </section>
    )
}

export default SideBarRight
