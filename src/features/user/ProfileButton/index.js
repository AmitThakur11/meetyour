import React from 'react'
import "./style.css"
function ProfileButton(props) {
    const { label ,  onClick , subPage} = props
    
    const selected =  label === subPage ? true : false
    console.log(selected)
    return (
        <section className = {selected ? "profileButton selected" : "profileButton"}>
            
            <button    onClick = {()=>onClick()}>
                
                {label}</button>
            
        </section>
    )
}

export default ProfileButton
