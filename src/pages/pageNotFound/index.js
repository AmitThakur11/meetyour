import React from 'react'
import PageNotFoundImg from "../../media/pageNotFound.png"
import "./style.css"
function PageNotFound() {
    return (
        <div className ="pageNotFound__section">
            <imdg src={PageNotFoundImg} alt ="404 page not found"/>
        </div>
    )
}

export default PageNotFound
