import FollowCard from "../../../component/FollowCard/index"
import {useSelector} from "react-redux"
function Following(props) {
    const {following} = props.user
    return (
        <div>
            <h1>Folllowing</h1>
            <div>
                {
                    following.map((user)=>{
                        return <FollowCard user ={user}/>

                    })

                }
            </div>
        </div>
    )
}

export default Following
