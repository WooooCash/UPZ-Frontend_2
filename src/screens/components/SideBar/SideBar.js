import "./SideBar.css";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SideBar(props) {

    const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

    return (
        <div className={"sideBar" + (sideBarCollapsed ? "" : " sideBarExpanded")}>
            {sideBarCollapsed &&
                <div className="sideBarButton" title="Pokaż zapisane plany" onClick={() => { setSideBarCollapsed(false) }}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            }
            {!sideBarCollapsed &&
                <div className="sideBarTopRow">
                    <div className="sideBarButton" onClick={() => { setSideBarCollapsed(true) }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="sideBarTitleText">
                        Zapisane plany
                    </div>
                </div>

            }
            {!sideBarCollapsed &&
                <div className="sideBarContent">
                    <div className="planListEntry">
                        Plan zajęć nr.2 - z konsultacjami nauczycieli
                    </div>
                    <div className="planListEntry">
                        Plan zajęć (semestr 3) bez grup Ps
                    </div>
                    <div className="planListEntry">
                        Main plan zajęć
                    </div>
                </div>
            }
        </div>
    );
}