import React from 'react'
import  Timeline from "../../component/timeline/index";
import SideBarLeft from '../../component/sideBarLeft';
import SideBarRight from "../../component/sideBarRight";
import "./style.css"

function Home() {
    return (
        <div className ="home">
            <SideBarLeft/>
            <Timeline/>
            <SideBarRight/>

            
        </div>
    )
}

export default Home
