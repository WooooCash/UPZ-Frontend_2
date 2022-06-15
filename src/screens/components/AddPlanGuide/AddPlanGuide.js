import "./AddPlanGuide.css";
import React, { useEffect, useState } from "react";
import PathNavigator from "../PathNavigator/PathNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faMapMarkerAlt, faArrowLeft, faChevronUp, faSquareRootAlt, faLaptopCode, faFunnelDollar, faAsterisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function AddPlanGuide(props) {

    const history = useHistory();

    const [collapsed, setCollapsed] = useState(false);
    const [screenNumber, setScreenNumber] = useState(0);

    const [availableTypesOfStudy, setAvailableTypesOfStudy] = useState([]);
    const [availableMajors, setAvailableMajors] = useState([]);
    const [availableDegrees, setAvailableDegrees] = useState([]);
    const [availableSpecialities, setAvailableSpecialities] = useState([]);
    const [availableSemesters, setAvailableSemesters] = useState([]);

    const [selectedTypeOfStudy, setSelectedTypeOfStudy] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedDegree, setSelectedDegree] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    


    const typesOfStudy = [
        {
            "id": "stacjonarne",
            "name": "Stacjonarne",
            "image": <FontAwesomeIcon icon={faBuilding} />
        },
        {
            "id": "niestacjonarne",
            "name": "Niestacjonarne",
            "image": <FontAwesomeIcon icon={faMapMarkerAlt} />
        },
        {
            "id": "other",
            "name": "Inne",
            "image": <FontAwesomeIcon icon={faAsterisk} />
        },
    ];

    const majors = [
        {
            "id": "informatyka",
            "name": "Informatyka",
            "image": <FontAwesomeIcon icon={faLaptopCode} />
        },
        {
            "id": "matematyka stosowana",
            "name": "Matematyka stosowana",
            "image": <FontAwesomeIcon icon={faSquareRootAlt} />
        },
        {
            "id": "informatyka i ekonometria",
            "name": "Informatyka i ekonometria",
            "image": <FontAwesomeIcon icon={faFunnelDollar} />
        },
        {
            "id": "other",
            "name": "Inne",
            "image": <FontAwesomeIcon icon={faAsterisk} />
        },
    ]

    const degrees = [
        {
            "id": "I",
            "name": "Stopień 1.",
            "image": "I"
        },
        {
            "id": "II",
            "name": "Stopień 2.",
            "image": "II"
        },
        {
            "id": "III",
            "name": "Stopień 3.",
            "image": "III"
        },
        {
            "id": "other",
            "name": "Inne",
            "image": <FontAwesomeIcon icon={faAsterisk} />
        },
    ]

    const screenTitles = ["Wybierz rodzaj studiów", "Wybierz kierunek", 'Wybierz stopień', 'Wybierz specjalizację', 'Wybierz semestr'];

    function getTypeOfStudiesAxiosConfig() {
        return {
            url: "https://upz-graphql.herokuapp.com/graphql",
            method: 'post',
            data: {
                query: `query {
                    fetchTypeOfStudies
                }`
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
    }

    function getMajorsAxiosConfig(typeOfStudyName) {
        return {
            url: "https://upz-graphql.herokuapp.com/graphql",
            method: 'post',
            data: {
                query: `query {
                    fetchMajors (typeOfStudyName: "${typeOfStudyName}")
                }`
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
    }

    function getDegreeAxiosConfig(typeOfStudyName, majorName) {
        return {
            url: "https://upz-graphql.herokuapp.com/graphql",
            method: 'post',
            data: {
                query: `query {
                    fetchDegree (typeOfStudyName: "${typeOfStudyName}", majorName: "${majorName}")
                }`
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
    }

    function getSpecialitiesAxiosConfig(typeOfStudyName, majorName, degree) {
        return {
            url: "https://upz-graphql.herokuapp.com/graphql",
            method: 'post',
            data: {
                query: `query {
                    fetchSpecialities (typeOfStudyName: "${typeOfStudyName}", majorName: "${majorName}", degree: "${degree}") {
                        id, name
                    }
                }`
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
    }

    function getSemestersAxiosConfig(typeOfStudyName, majorName, degree, specialityId) {
        return {
            url: "https://upz-graphql.herokuapp.com/graphql",
            method: 'post',
            data: {
                query: `query {
                    fetchSemesters (typeOfStudyName: "${typeOfStudyName}", majorName: "${majorName}", degree: "${degree}", specialityId: "${specialityId}")
                }`
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
    }

    useEffect(() => {
        axios(getTypeOfStudiesAxiosConfig())
            .then(response => {
                if (response.status == 200) {
                    setAvailableTypesOfStudy(response.data.data.fetchTypeOfStudies);
                }
                //todo: przygotować na sytuację, w której nie będzie zwrócony 200 OK
            });
    }, []);

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

    function selectTypeOfStudy(type) {
        setSelectedTypeOfStudy(type);
        setScreenNumber(1);
        axios(getMajorsAxiosConfig(type))
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data);
                    setAvailableMajors(response.data.data.fetchMajors);
                }
                //todo: przygotować na sytuację, w której nie będzie zwrócony 200 OK
            });
    }

    function selectMajor(major) {
        setSelectedMajor(major);
        setScreenNumber(2);
        axios(getDegreeAxiosConfig(selectedTypeOfStudy, major))
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data);
                    setAvailableDegrees(response.data.data.fetchDegree);
                }
                //todo: przygotować na sytuację, w której nie będzie zwrócony 200 OK
            });
    }

    function selectDegree(degree) {
        setSelectedDegree(degree);
        axios(getSpecialitiesAxiosConfig(selectedTypeOfStudy, selectedMajor, degree))
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data);
                    var specialities = response.data.data.fetchSpecialities.filter((s) => !s.name.includes('obieraln'))
                    console.log(specialities);
                    setAvailableSpecialities(specialities);
                    if (specialities.length == 1 && specialities[0].id == '0') {
                        setSelectedSpeciality("0");
                        setScreenNumber(4);
                        axios(getSemestersAxiosConfig(selectedTypeOfStudy, selectedMajor, degree, "0"))
                            .then(response => {
                                if (response.status == 200) {
                                    console.log(response.data);
                                    setAvailableSemesters(response.data.data.fetchSemesters);
                                }
                                //todo: przygotować na sytuację, w której nie będzie zwrócony 200 OK
                            });
                    } else {
                        setScreenNumber(3);
                    }
                }
                //todo: przygotować na sytuację, w której nie będzie zwrócony 200 OK
            });
    }

    function selectSpeciality(speciality) {
        setSelectedSpeciality(speciality);
        setScreenNumber(4);
        axios(getSemestersAxiosConfig(selectedTypeOfStudy, selectedMajor, selectedDegree, speciality))
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data);
                    setAvailableSemesters(response.data.data.fetchSemesters);
                }
                //todo: przygotować na sytuację, w której nie będzie zwrócony 200 OK
            });
    }

    function selectSemester(semester) {
        let config = {
            "typeOfStudies": selectedTypeOfStudy,
            "major": selectedMajor,
            "degree": selectedDegree,
            "specialityId": selectedSpeciality,
            "semester": semester,
        }
        console.log({
            "typeOfStudies": selectedTypeOfStudy,
            "major": selectedMajor,
            "degree": selectedDegree,
            "specialityId": selectedSpeciality,
            "semester": semester,
        });
        //todo: zapisywanie do LocalStorage
        history.push("/selectGroups", config);
    }

    function goBackAScreen() {
        if (screenNumber == 4 && availableSpecialities.length == 1 && availableSpecialities[0].id == 0) {
            setScreenNumber(screenNumber - 2);
        }
        else if (screenNumber > 0) {
            setScreenNumber(screenNumber - 1);
        }
    }

    function getNodesForPathNavigator() {
        let nodes = [];
        if (selectedTypeOfStudy != '') {
            nodes.push(
                {
                    "name": typesOfStudy?.find(l => l.id == selectedTypeOfStudy)?.name ?? "??",
                    "onClick": () =>  {
                        setAvailableMajors([]);
                        setAvailableDegrees([]);
                        setAvailableSpecialities([]);
                        setAvailableSemesters([]);
                        setScreenNumber(0);
                    }
                }
            );
        }
        if (selectedMajor != '') {
            nodes.push(
                {
                    "name": majors?.find(f => f.id == selectedMajor)?.name ?? "??",
                    "onClick": () => {
                        setAvailableDegrees([]);
                        setAvailableSpecialities([]);
                        setAvailableSemesters([]);
                        setScreenNumber(1);
                    }
                }
            );
        }
        if (selectedDegree != '') {
            nodes.push(
                {
                    "name": degrees?.find(deg => deg.id == selectedDegree)?.name ?? "??",
                    "onClick": () => {
                        setAvailableSpecialities([]);
                        setAvailableSemesters([]);
                        setScreenNumber(2);
                    }
                }
            );
        }
        if ((selectedSpeciality != '') && !(availableSpecialities.length == 1 && availableSpecialities[0].id == 0)) {
            nodes.push(
                {
                    "name": availableSpecialities.find((s) => s.id == selectedSpeciality)?.name ?? "??",
                    "onClick": () => { 
                        setAvailableSemesters([]);
                        if (availableSpecialities.length == 1 && availableSpecialities[0].id == 0) {
                            setScreenNumber(2);
                        } else {
                            setScreenNumber(3);
                        }
                    }
                }
            );
        }

        return nodes;
    }

    function getTypeOfStudiesOptions() {
        return Array.from(availableTypesOfStudy).map((entry) => {
            var foundIndex = typesOfStudy.findIndex((type) => type.id == entry)
            if (foundIndex < 0) {
                return typesOfStudy.find((type) => type.id == "other");
            } else {
                return typesOfStudy[foundIndex];
            }
        });
    }

    function getMajorsOptions() {
        return Array.from(availableMajors).map((entry) => {
            var foundIndex = majors.findIndex((major) => major.id == entry)
            if (foundIndex < 0) {
                return majors.find((type) => type.id == "other");
            } else {
                return majors[foundIndex];
            }
        });
    }

    function getDegreesOptions() {
        return Array.from(availableDegrees).map((entry) => {
            var foundIndex = degrees.findIndex((degree) => degree.id == entry)
            if (foundIndex < 0) {
                return degrees.find((type) => type.id == "other");
            } else {
                return degrees[foundIndex];
            }
        });
    }

    function getSpecialitiesOptions() {
        return Array.from(availableSpecialities).map((entry) => {
            return {
                "id": entry.id,
                "name": entry.name,
                "image": <FontAwesomeIcon icon={faAsterisk} />
            };
        });
    }

    function getSemestersOptions() {
        return Array.from(availableSemesters).map((entry) => {
            return {
                "id": entry,
                "name": `Semestr ${entry}.`,
                "image": <FontAwesomeIcon icon={faAsterisk} />
            };
        });
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
            {!collapsed &&
                <div className="paddingLeft">
                    <PathNavigator nodes={getNodesForPathNavigator().slice(0, screenNumber)} />
                </div>
            }
            {!collapsed &&
                <div className="guideContent">
                    {screenNumber == 0 &&
                        <_AddPlanGuideScreen options={getTypeOfStudiesOptions()} onSelect={(id) => {selectTypeOfStudy(id)}} />
                    }
                    {screenNumber == 1 &&
                        <_AddPlanGuideScreen options={getMajorsOptions()} onSelect={(id) => selectMajor(id)} />
                    }
                    {screenNumber == 2 &&
                        <_AddPlanGuideScreen options={getDegreesOptions()} onSelect={(id) => selectDegree(id)} />
                    }
                    {screenNumber == 3 &&
                        <_AddPlanGuideScreen options={getSpecialitiesOptions()} onSelect={(id) => selectSpeciality(id)} />
                    }
                    {screenNumber == 4 &&
                        <_AddPlanGuideScreen options={getSemestersOptions()} onSelect={(id) => selectSemester(id)} />
                    }
                </div>
            }
        </div>
    );
}

function _AddPlanGuideScreen(props) {

    let buttons = [];

    for (let option of props.options) {
        buttons.push(
            <div key={option.id} className="guideButton" onClick={() => props?.onSelect(option.id)}>
                {option.image}
                <div className="guideButtonText">{option.name}</div>
            </div>
        )
    }

    return (
        <div className="contentRow">
            {buttons}
        </div>
    );
}

function _SelectLocalityScreen(props) {
    return (
        <div>
            <div className="contentRow">
                <div className="guideButton" onClick={() => props.onSelect(0)}>
                    <FontAwesomeIcon icon={faBuilding} />
                    <div className="guideButtonText">Stacjonarne</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(1)}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <div className="guideButtonText">Niestacjonarne</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(2)}>
                    <FontAwesomeIcon icon={faAsterisk} />
                    <div className="guideButtonText">Inne</div>
                </div>
            </div>
        </div>
    );
}

function _SelectFieldScreen(props) {
    return (
        <div>
            <div className="contentRow">
                <div className="guideButton" onClick={() => props.onSelect(0)}>
                    <FontAwesomeIcon icon={faLaptopCode} />
                    <div className="guideButtonText">Informatyka</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(1)}>
                    <FontAwesomeIcon icon={faFunnelDollar} />
                    <div className="guideButtonText">Informatyka i ekonometria</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(2)}>
                    <FontAwesomeIcon icon={faSquareRootAlt} />
                    <div className="guideButtonText">Matematyka stosowana</div>
                </div>
            </div>
        </div>
    );
}

function _SelectSemesterScreen(props) {
    return (
        <div>
            <div className="contentRow">
                <div className="guideButton" onClick={() => props.onSelect(0)}>
                    I
                    <div className="guideButtonText">Semestr 1.</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(1)}>
                    II
                    <div className="guideButtonText">Semestr 2.</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(2)}>
                    III
                    <div className="guideButtonText">Semestr 3.</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(3)}>
                    IV
                    <div className="guideButtonText">Semestr 4.</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(4)}>
                    V
                    <div className="guideButtonText">Semestr 5.</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(5)}>
                    VI
                    <div className="guideButtonText">Semestr 6.</div>
                </div>
                <div className="guideButton" onClick={() => props.onSelect(6)}>
                    VII
                    <div className="guideButtonText">Semestr 7.</div>
                </div>
            </div>
        </div>
    );
}