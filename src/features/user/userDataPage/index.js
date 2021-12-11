import FollowCard from "../../../component/FollowCard/index"
function UserDataPage(props) {
    const {data , title} = props.user
    
    return (
        <div>
            <h1>{title}({data.length})</h1>
            <br/>
            <div>
                {
                    data.map((user)=>{
                        return <FollowCard user ={user}/>

                    })

                }
            </div>
        </div>
    )
}

export default UserDataPage
