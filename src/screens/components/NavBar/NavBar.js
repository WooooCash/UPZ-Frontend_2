import './NavBar.css'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <div className="navbar">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="navbar-button navbar-button-selected">
                    <div className="navbar-button-icon">
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </div>
                    <div className="navbar-button-text"> 
                        Nowy Plan
                    </div>
                </div>
            </Link>
            <Link to="/consultations" style={{ textDecoration: 'none' }}>
                <div className="navbar-button">
                    <div className="navbar-button-icon">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="navbar-button-text"> 
                        Nauczyciele
                    </div>
                </div>
            </Link>
        </div>
    );
}