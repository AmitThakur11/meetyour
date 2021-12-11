import React from 'react'
import "./style.css"
import {useSelector} from 'react-redux'
import {RiEditLine} from "react-icons/ri"
function About(props) {
    const {user , isAdmin}= props;



    
    
    return (
        <div className = "pd__aboutContainer">
                    <div className = "aboutContainer__wrapper">
                        <div className="aboutItem">Username<div>{user.username}</div></div>
                        <div className="aboutItem">Email<div>{user.email}</div></div>
                        <div className="aboutItem">Bio<div>23 '  on the way to become a fullstack developer</div></div>
                        <div className="aboutItem">D.O.B<div>{user.dateOfBirth}</div></div>
                        <div className="aboutItem">Website<div>http://localhost:3000</div></div>
                       {isAdmin && <div className ="pd__editBtn"><RiEditLine/></div>}
                    </div>
                    <div className ="editAbout__form">


                    </div>
                      

                    </div>
    )
}

export default About
