import "./MainScreen.css"
import React from "react";

import NavBar from "./../components/NavBar/NavBar"
import SideBar from "./../components/SideBar/SideBar";

export default function MainScreen(props) {
    return (
        <div className="column">
            <NavBar />
            <div className="content-box">
                <div className="content-main">
                    MainContent
                </div>
                <SideBar />
            </div>
        </div>
    )
}