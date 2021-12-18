import "./AddPlanGuide.css";
import React, { useState } from "react";
import PathNavigator from "../PathNavigator/PathNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronUp, faSquareRootAlt, faLaptopCode, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";

export default function AddPlanGuide(props) {

    const [collapsed, setCollapsed] = useState(false);
    const [screenNumber, setScreenNumber] = useState(0);
    const [degree, setDegree] = useState(-1);
    const [semester, setSemester] = useState(-1);

    const degreeNames = ["Informatyka", "Informatyka i ekonometria", "Matematyka stosowana"];
    const semesterNames = ["Semestr 1.", "Semestr 2.", "Semestr 3.", "Semestr 4.", "Semestr 5.", "Semestr 6.", "Semestr 7."]

    const screenTitles = ["Wybierz kierunek", 'Wybierz semestr'];

    function getScreenTitle() {
        if (screenNumber > screenTitles.length - 1 || screenNumber < 0) return "Unknown";
        return screenTitles[screenNumber];
    }

    function toggleCollapsedState() {
        if (collapsed) {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }

    function selectDegree(id) {
        setDegree(id);
        setScreenNumber(1);
    }

    function selectSemester(id) {
        setSemester(id)
        setScreenNumber(2);
    }

    function goBackAScreen() {
        if (screenNumber > 0) {
            setScreenNumber(screenNumber - 1);
        } 
    }

    function getNodesForPathNavigator() {
        return [
            {
                "name": (degree > -1 && degree < degreeNames.length) ? degreeNames[degree] : "??",
                "onClick": () => setScreenNumber(0)
            },
            {
                "name": (semester > -1 && semester < semesterNames.length) ? semesterNames[semester] : "??",
                "onClick": () => setScreenNumber(1)
            }
        ]
    }

    return (
        <div className={"guideContainer" + (collapsed ? " guideContainerCollapsed" : "")}>
            <div className="guideNavBar">
                {screenNumber > 0 && !collapsed &&
                    <div className="guideNavBarButton" onClick={() => goBackAScreen()}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                }
                <div className="guideNavBarClickableRow" onClick={() => toggleCollapsedState(true)}>
                    <div className="guideNavBarTitle">{getScreenTitle()}</div>
                    <div className="guideCollapseButton">
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                </div>
            </div>
            {/* {!collapsed &&
                <div style={{height: "16px"}}></div>
            } */}
            {!collapsed && 
                <div className="paddingLeft">
                    <PathNavigator nodes={getNodesForPathNavigator()} activeNodesCount={screenNumber}/>
                </div>
            }
            {!collapsed &&
                <div className="guideContent">
                    {screenNumber == 0 && 
                        <div>
                            <div className="contentRow">
                                <div className="guideButton" onClick={() => selectDegree(0)}>
                                    <FontAwesomeIcon icon={faLaptopCode} />
                                    <div className="guideButtonText">Informatyka</div>
                                </div>
                                <div className="guideButton" onClick={() => selectDegree(1)}>
                                    <FontAwesomeIcon icon={faFunnelDollar} />
                                    <div className="guideButtonText">Informatyka i ekonometria</div>
                                </div>
                                <div className="guideButton" onClick={() => selectDegree(2)}>
                                    <FontAwesomeIcon icon={faSquareRootAlt}/>
                                    <div className="guideButtonText">Matematyka stosowana</div>
                                </div>
                            </div>
                        </div>
                    }
                    {screenNumber == 1 && 
                        <div>
                            <div className="contentRow">
                                <div className="guideButton" onClick={() => selectSemester(0)}>
                                    I
                                    <div className="guideButtonText">Semestr 1.</div>
                                </div>
                                <div className="guideButton" onClick={() => selectSemester(1)}>
                                    II
                                    <div className="guideButtonText">Semestr 2.</div>
                                </div>
                                <div className="guideButton" onClick={() => selectSemester(2)}>
                                    III
                                    <div className="guideButtonText">Semestr 3.</div>
                                </div>
                                <div className="guideButton" onClick={() => selectSemester(3)}>
                                    IV
                                    <div className="guideButtonText">Semestr 4.</div>
                                </div>
                            </div>
                            <div className="contentRow">
                                <div className="guideButton" onClick={() => selectSemester(4)}>
                                    V
                                    <div className="guideButtonText">Semestr 5.</div>
                                </div>
                                <div className="guideButton" onClick={() => selectSemester(5)}>
                                    VI
                                    <div className="guideButtonText">Semestr 6.</div>
                                </div>
                                <div className="guideButton" onClick={() => selectSemester(6)}>
                                    VII
                                    <div className="guideButtonText">Semestr 7.</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}