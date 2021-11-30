import React from 'react'
import Logo from "../../media/meeteor.png"
import "./style.css"
import { FiSearch } from "react-icons/fi";
import { RiAliensFill } from "react-icons/ri";
import {Link} from "react-router-dom"

function Header() {
    return (
        <nav className ="header">
            <Link to="/">
            <section className ="logo">
                <img src={Logo} alt="logo"/>
                <div className ="logoName">Meet<br/><span>Your</span></div>
            </section>
            </Link>
            <section className ="subHeader">
            <div className ="searchBar">
                    <input/>
                    <FiSearch/>
            </div>
            <section className ="headerOption">
                
            <Link to ="/register" ><button className="logBtn">Log out</button></Link>
                <Link to ="/profile" >
                <RiAliensFill />
                </Link>
            </section>
            </section>

        </nav>
    )
}

export default Header