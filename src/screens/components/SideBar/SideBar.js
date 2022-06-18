import "./SideBar.css";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function SideBar(props) {

    const [sideBarCollapsed, setSideBarCollapsed] = useState(true);
    const [savedPlans, setSavedPlans] = useState([]);
    const history = useHistory();

    useEffect(() => {
        var savedPlans = window.localStorage.getItem("savedPlans");
        if (savedPlans == null) savedPlans = [];
        else savedPlans = JSON.parse(savedPlans);
        setSavedPlans(() => savedPlans);
    }, []);

    function deleteNthPlan(n) {
        console.log("delete: " + n);
        var savedPlans = window.localStorage.getItem("savedPlans");
        if (savedPlans == null) savedPlans = [];
        else savedPlans = JSON.parse(savedPlans)
        var result = [];
        for (var i = 0; i < savedPlans.length; i++) {
            if (i == n) continue;
            result.push(savedPlans.at(i));
        }
        window.localStorage.setItem("savedPlans", JSON.stringify(result));
        setSavedPlans(() => result);
    }

    var plansComponents = [];
    for (var i = 0; i < savedPlans.length; i++) {
        let plan = savedPlans[i];
        let localI = i;
        plansComponents.push(<div className="planListEntry" >
            <div style={{flex: "1"}} onClick={() => history.push('/planTest', plan)}>{plan["name"]}</div>
            <div className="planListEntryDeleteButton" onClick={() => deleteNthPlan(localI)}>X</div>
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