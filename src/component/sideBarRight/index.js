import {useEffect} from 'react'
import FollowCard from '../FollowCard'
import {useDispatch,useSelector} from "react-redux"
import {allUsers} from "../../features/user/userSlice"
import {MdOutlineExplore } from "react-icons/md"
import "./style.css"

function SideBarRight({on}) {
    const dispatch = useDispatch();
    const {user,otherUsers} = useSelector(state => state.user);
    console.log(otherUsers)
    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])


    return (
        <section className = {on?"rightSideBar bar-two barOn":"rightSideBar bar-two "} >
            <div className ="exploreSection">
            <MdOutlineExplore />
            </div>
            
        {
            otherUsers?.map((others)=>{
                return user._id !==others._id && <FollowCard user={others}/>
            })
        }
        
      
        

            
        </section>
    )
}

export default SideBarRight
