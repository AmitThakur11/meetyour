import {FollowCard} from "../../../component"
import "./style.css"
function Following(props) {
    const {following} = props.user
    return (
        <div>
            <h1>Following</h1>
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
