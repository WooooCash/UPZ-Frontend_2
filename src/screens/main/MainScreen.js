import "./MainScreen.css"
import React from "react";


import NavBar from "./../components/NavBar/NavBar"
import SideBar from "./../components/SideBar/SideBar";
import Tree from "./TreeView/Tree";
import AddPlanGuide from "../components/AddPlanGuide/AddPlanGuide";
import { useHistory } from "react-router-dom";

export default function MainScreen(props) {

    const history = useHistory();

    return (
        <div className="column">
            <NavBar />
            <div className="content-box">
                <div className="content-main">
                    <AddPlanGuide />
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