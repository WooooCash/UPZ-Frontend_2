import "./SideBar.css";
import React, { useState } from "react";

export default function SideBar(props) {

    const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

    return (
        <div className={"side-bar" + (sideBarCollapsed ? "" : " side-bar-expanded" )}>
            {sideBarCollapsed &&
                <div className="sideBarExpandButton" onClick={() => { setSideBarCollapsed(false) }}>
                    |||
                </div>
            }
            {!sideBarCollapsed &&
                <div className="sideBarCollapseButton" onClick={() => { setSideBarCollapsed(true) }}>
                    V
                </div>
            }
        </div>
    );
}