import React from 'react'
import Logo from "../../media/meeteor.png"
import "./style.css"
// import { FiSearch } from "react-icons/fi";
import {useSelector} from "react-redux"
import { RiAliensFill } from "react-icons/ri";
import {Link} from "react-router-dom"
import {useState} from "react"
import {logout} from "../../features/user/userSlice";
import {useDispatch} from "react-redux"
function Header() {
    const dispatch = useDispatch()

    const [searchText , setSearchText] =useState("")
    const [userOption, setUserOption] =useState(false)
    const {user ,otherUsers} = useSelector((state)=>state.user)

    
    const searchData = otherUsers.filter((data)=> data.username.match(searchText))
    const logoutHandler =()=>{
        dispatch(logout())
        setUserOption(false);
        // navigate("/login")
    }

    return (
        <nav className ="header">
            <Link to="/">
            <section className ="logo">
                <img src={Logo} alt="logo"/>
                <div className ="logoName">Meet<span>Your</span></div>
            </section>
            </Link>
            <section className ="subHeader">
            <div className ="searchBar">
                
                <input value={searchText} placeholder = "Search..." onChange ={(e)=>setSearchText(e.target.value)}/>
                {searchText.length > 0 && <div className ="searchResult">{
                    searchData.map((user)=>{
                        return (
                            <>
                            <Link to ={`/profile/${user._id}`}>
                            <div className="searchItem" onClick={()=>{
                                setSearchText("")
                                }}>
                                <img src={user.displayPic} alt={user._id}/>
                                <span>{user.username}</span>
                            </div>

                            </Link>
                            </>
                        )

                    })
                

                }</div>}
                {(searchText.length > 0 && searchData.length === 0 ) && <div className ="searchResult" style={{fontSize : "18px"}}>No match</div>}
                    
            </div>
            <section className ="headerOption">
                
            {/* <Link to ="/register" ><button className="logBtn">Log out</button></Link> */}
                
                
                <div className ="userMenu">
                <span onClick={()=>{
                    setUserOption((menu)=>!menu
                    )

                }}>
                <RiAliensFill />
                </span>
                {userOption && <div className ="userMenu__options umOption__on" >
                <Link to ={`/profile/${user._id}`} >
                    <span onClick={()=>setUserOption(false)}>Profile</span>
                </Link>
                <span onClick={()=>logoutHandler()}>Log out</span>
                </div>}

                </div>

                
            </section>
            </section>

        </nav>
    )
}

export default Header