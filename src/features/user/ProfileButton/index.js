import React from 'react'
import "./style.css"
function ProfileButton(props) {
    //  const forClicked = { color:"white" , backgroundColor:"blue"}
    return (
        <section className ="profileButton">
            <button   onClick = {props.onClick}>{props.name}</button>
            
        </section>
    )
}

export default ProfileButton
