import React from 'react'
import Logo from "../../media/meeteor.png"
import "./style.css"
import { FiSearch } from "react-icons/fi";
import { RiAliensFill } from "react-icons/ri";
import {Link} from "react-router-dom"

function Header() {
    return (
        <nav className ="header">
            <section className ="logo">
                <img src={Logo} alt="logo"/>
                <div className ="logoName">Meet<br/><span>Your</span></div>
            </section>
            <section className ="subHeader">
            <div className ="searchBar">
                    <input/>
                    <FiSearch/>
            </div>
            <section className ="headerOption">
                
                <button>Log out</button>
                <Link to ="/profile" >
                <RiAliensFill />
                </Link>
            </section>
            </section>

        </nav>
    )
}

export default Header