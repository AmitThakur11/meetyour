import React from 'react'
import "./style.css"
function ProfileButton(props) {
    return (
        <section className ="profileButton">
            <button>{props.name}</button>
            
        </section>
    )
}

export default ProfileButton
