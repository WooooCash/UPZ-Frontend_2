import "./SideBar.css";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function SideBar(props) {

    const [sideBarCollapsed, setSideBarCollapsed] = useState(true);
    const history = useHistory();

    var savedPlans = window.localStorage.getItem("savedPlans");
    if (savedPlans == null) savedPlans = [];
    else savedPlans = JSON.parse(savedPlans);
    console.log("savedPlans");
    console.log(savedPlans);

    var plansComponents = [];
    for (let plan of savedPlans) {
        plansComponents.push(<div className="planListEntry" onClick={() => history.push('/planTest', plan)}>
            {plan["name"]}
        </div>);
    }

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
                    {plansComponents}
                </div>
            }
        </div>
    );
}