import './NavBar.css'
import React, { useState } from "react";

export default function NavBar() {

    return (
        <div className="navbar">
            <div className="navbar-button navbar-button-selected">Nowy Plan</div>
            <div className="navbar-button">Nauczyciele</div>
        </div>
    );
}