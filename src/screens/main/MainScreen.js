import "./MainScreen.css"
import React from "react";

import NavBar from "./../components/NavBar/NavBar"
import SideBar from "./../components/SideBar/SideBar";
import Tree from "./TreeView/Tree";

export default function MainScreen(props) {
    return (
        <div className="column">
            <NavBar />
            <div className="content-box">
                <div className="content-main">
                    <div className="guideAddPlan">
                        
                    </div>
                    <div className="plansTreeView">
                        TreeView
                        <Tree />
                    </div>
                </div>
                <SideBar />
            </div>
        </div>
    )
}