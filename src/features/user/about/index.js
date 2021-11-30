import React from 'react'
import "./style.css"
import {RiEditLine} from "react-icons/ri"
function About() {
    return (
        <div className = "pd__aboutContainer">
                    <div className = "aboutContainer__wrapper">
                        <div className="aboutItem">Username<div>i.m.Dexter</div></div>
                        <div className="aboutItem">Email<div>amitthakur081@gmail.com</div></div>
                        <div className="aboutItem">Bio<div>23 '  on the way to become a fullstack developer</div></div>
                        <div className="aboutItem">D.O.B<div>21-09-1998</div></div>
                        <div className="aboutItem">Website<div>http://localhost:3000</div></div>
                        <div className ="pd__editBtn"><RiEditLine/></div>
                        </div>
                      

                    </div>
    )
}

export default About
