import "./MainScreen.css"
import React from "react";

import SideBar from "./../components/SideBar/SideBar";

export default function MainScreen(props) {
    return (
        <div className="column">
            <div className="navbar">
                <div className="navbar-button navbar-button-selected">Home</div>
                <div className="navbar-button">Nauczyciele</div>
            </div>
            <div className="content-box">
                <div className="content-main">
                    skjfdkajsndfkjna
                </div>
                <SideBar />
            </div>
        </div>
    )
}