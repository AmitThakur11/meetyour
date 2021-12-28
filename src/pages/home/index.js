import {useState} from "react"
import  Timeline from "../../features/post/timeline/index";
import SideBarLeft from '../../component/sideBarLeft';
import SideBarRight from "../../component/sideBarRight";
// import {useSelector} from "react-redux"
import "./style.css"
import {MdOutlineExplore , MdAddCircleOutline , MdMenu} from "react-icons/md"



function Home() {
    const initialSwitch = {
        menu : false,
        explore : false,
    }
    const [switches , setSwitches] = useState(initialSwitch)
    const switchBtn = ((type)=>{
                switch(type){
                    case "menu":
                        return setSwitches((switches)=>{
                            return {...switches , [type] : !switches[type], explore :false}
                        })
                    case "explore":
                        return setSwitches((switches)=>{
                                return {...switches , [type] : !switches[type], menu :false}
                        })
                    default:
                        return initialSwitch
                }
        }
    )
    return (
        <div id="addPost__area" className ="home">
      
            
            
            <SideBarLeft on ={switches.menu}/>
            
            
             <Timeline/>
  
            <SideBarRight on = {switches.explore} />
            <div className="sideFloating__btnContainer">
          <label id ="exploreBtn" onClick ={()=>switchBtn("explore")}>
            <MdOutlineExplore />
          </label>
          
          <label id ="gotTo__addPost">
            <a href ="#addPost__area"><MdAddCircleOutline/></a>
          </label>

          <label id ="menuBtn" onClick ={()=>switchBtn("menu")}>
          <MdMenu/>
          </label>

        </div>
   
            

            
        </div>
    )
}

export default Home
