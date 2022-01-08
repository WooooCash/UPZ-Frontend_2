import "./ConsultationsScreen.css"
import React from "react";

import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar";
import Consultations from "./ConsultationsView/Consultations";




export default function ConsultationsScreen(props) {
    return (
        <div className="column">
            <NavBar />
            <div className="content-box">
                <div className="content-main">
                    <Consultations />
                </div>
                <SideBar />
            </div>
        </div>
    )
}