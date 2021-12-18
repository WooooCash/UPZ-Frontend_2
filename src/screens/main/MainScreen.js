import "./MainScreen.css"
import React from "react";

import NavBar from "./../components/NavBar/NavBar"
import SideBar from "./../components/SideBar/SideBar";
import AddPlanGuide from "../components/AddPlanGuide/AddPlanGuide";

export default function MainScreen(props) {
    return (
        <div className="column">
            <NavBar />
            <div className="content-box">
                <div className="content-main">
                    <AddPlanGuide />
                    <div className="plansTreeView">
                        TreeView
                    </div>
                </div>
                <SideBar />
            </div>
        </div>
    )
}