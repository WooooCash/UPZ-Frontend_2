import "./AddPlanGuide.css";
import React, { useEffect, useState } from "react";
import PathNavigator from "../PathNavigator/PathNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faMapMarkerAlt, faArrowLeft, faChevronUp, faSquareRootAlt, faLaptopCode, faFunnelDollar, faAsterisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddPlanGuide(props) {

    const [collapsed, setCollapsed] = useState(false);
    const [screenNumber, setScreenNumber] = useState(0);

    const [locality, setLocality] = useState('');
    const [field, setField] = useState('');
    const [degree, setDegree] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [semester, setSemester] = useState('');

    const [studies, setStudies] = useState([]);
    const [specialities, setSpecialities] = useState([]);

    const [studySpecialities, setStudySpecialities] = useState({});
    const [studySemesters, setStudySemesters] = useState({});

    const localities = [
        {
            "id": "stac.",
            "name": "Stacjonarne",
            "image": <FontAwesomeIcon icon={faBuilding} />
        },
        {
            "id": "niest.",
            "name": "Niestacjonarne",
            "image": <FontAwesomeIcon icon={faMapMarkerAlt} />
        },
        {
            "id": "other",
            "name": "Inne",
            "image": <FontAwesomeIcon icon={faAsterisk} />
        },
    ];

    const fields = [
        {
            "id": "informatyka",
            "name": "Informatyka",
            "image": <FontAwesomeIcon icon={faLaptopCode} />
        },
        {
            "id": "mat. stos.",
            "name": "Matematyka stosowana",
            "image": <FontAwesomeIcon icon={faSquareRootAlt} />
        },
        {
            "id": "inf. i ekon.",
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

    const semesterNames = ["Semestr 1.", "Semestr 2.", "Semestr 3.", "Semestr 4.", "Semestr 5.", "Semestr 6.", "Semestr 7."]

    const [semesters, setSemesters] = useState([]);

    const screenTitles = ["Wybierz rodzaj studiów", "Wybierz kierunek", 'Wybierz stopień', 'Wybierz specjalizację', 'Wybierz semestr'];

    useEffect(() => {
        console.log('effect');
        axios({url:"https://upz-graphql.herokuapp.com/graphql",
            method:'post',
            data:{
                query: `query {
                    fetchPlans{
                        studyId,
                        specialityId,
                        semester,
                    }
                }`
            },
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then(response =>{

            let newStudySpecialities = {};
            response.data.data.fetchPlans.forEach(plan => {
                if (!newStudySpecialities[Number.parseInt(plan.studyId)]) {
                    newStudySpecialities[Number.parseInt(plan.studyId)] = new Set();
                }
                newStudySpecialities[Number.parseInt(plan.studyId)].add(plan.specialityId);
            });
            setStudySpecialities(newStudySpecialities);

            let newStudySemesters = {};
            response.data.data.fetchPlans.forEach(plan => {
                if (!newStudySemesters[Number.parseInt(plan.studyId)]) {
                    newStudySemesters[Number.parseInt(plan.studyId)] = new Set();
                }
                newStudySemesters[Number.parseInt(plan.studyId)].add(plan.semester);
            });
            setStudySemesters(newStudySemesters);

            let studyIds = new Set();
            response.data.data.fetchPlans.map((plan) => plan.studyId).forEach(id => {
                if (id != null && id != '' && id != 'null') {
                    studyIds.add(id);
                }
            });

            if (studyIds.size > 0) {
                axios({url:"https://upz-graphql.herokuapp.com/graphql",
                    method:'post',
                    data:{
                        query: `query {
                            fetchStudies{
                                id,
                                name
                            }
                        }`
                    },
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                }).then(response =>{
                    // let studies = new Set();
                    // response.data.data.fetchStudies.forEach((study) => {
                    //     if (studyIds.has(Number.parseInt(study.id))) {
                    //         studies.add(study.name);
                    //     } 
                    // })
                    // console.log(studies);

                    // sparsowanie dostępnych studiów
                    let newStudies = [];
                    for (let study of response.data.data.fetchStudies) {
                        let newEntry = {
                            "id": Number.parseInt(study.id),
                            "locality": "other",
                            "field": "other",
                            "degree": "other",
                            "original": ""
                        };
                        newEntry.original = study.name;
                        // ustalenie stacjonarności
                        if (/stac\./.test(study.name)) {
                            newEntry.locality = 'stac.';
                        } else if (/niest\./.test(study.name)) {
                            newEntry.locality = 'niest.';
                        } 
                        //ustalenie kierunku
                        try {
                            let field = (/kier\.\s*(.*)$/g).exec(study.name)[1];
                            newEntry.field = field;
                        } catch {
                            console.log('study deos not have a field')
                        }
                        // ustalenie stopnia
                        try {
                            let degree = (/(I{1,3})\s?st\./).exec(study.name)[1];
                            newEntry.degree = degree;
                        } catch {
                            console.log('study does not have a degree')
                        }
                        newStudies.push(newEntry);
                        console.log(newEntry);
                    }
                    setStudies(newStudies);
                });
            }

            let specialityIds = new Set();
            response.data.data.fetchPlans.map((plan) => plan.specialityId).forEach(id => {
                if (id != null && id != '' && id != 'null') {
                    specialityIds.add(id);
                }
            });

            if (specialityIds.size > 0) {
                axios({url:"https://upz-graphql.herokuapp.com/graphql",
                    method:'post',
                    data:{
                        query: `query {
                            fetchSpecialities{
                                id,
                                name
                            }
                        }`
                    },
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                }).then(response2 =>{
                    let specialities = new Set();
                    response2.data.data.fetchSpecialities.forEach((speciality) => {
                        if (specialityIds.has(Number.parseInt(speciality.id))) {
                            specialities.add(speciality.name);
                        } 
                    });
                    let newSpecialities = [];
                    for (let speciality of specialities) {
                        let newEntry = {
                            "id": Number.parseInt(speciality),
                            "name": speciality.name ?? '',
                        };
                        newSpecialities.push(newEntry);
                    }
                    console.log('specialities', specialities);
                    console.log('studySpeciality', studySpecialities);
                    setSpecialities(newSpecialities);
                });
            }
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

    function selectLocality(id) {
        setLocality(id);
        setScreenNumber(1);
    }

    function selectField(id) {
        setField(id);
        setScreenNumber(2);
    }

    function selectDegree(id) {
        let selectedStudy = studies.find(s => (s.locality == locality && s.field == field && s.degree == id));
        if (selectedStudy) {
            let specialities = [...(studySpecialities[selectedStudy.id] ?? [])]?.filter(s => s != 0);
            console.log(specialities);
            if (specialities.length > 0) {
                setScreenNumber(3);
                return;
            }
        }
        setDegree(id);
        setSpeciality('');
        updateVisibleSemesters();
        setScreenNumber(4);
    }

    function selectSemester(id) {
        setSemester(id)
        setScreenNumber(3);
    }

    function goBackAScreen() {
        if (screenNumber > 0) {
            setScreenNumber(screenNumber - 1);
        } 
    }

    function updateVisibleSemesters() {
        let selectedStudy = studies.find(s => (s.locality == locality && s.field == field && s.degree == degree));
        if (selectedStudy) {
            let semesters = [...studySemesters[selectedStudy.id]]?.filter(s => s != 0);
            let newSemesters = [];
            for (let semester of semesters) {
                newSemesters.push({
                    "id": semester,
                    "name": "Semestr " + semester + '.',
                    "image": semester
                });
            }
            setSemester(semesters);
        }
    }

    function getNodesForPathNavigator() {
        let nodes = [];
        if (locality != '') {
            nodes.push(
                {
                    "name": localities?.find(l => l.id == locality)?.name ?? "??",
                    "onClick": () => setScreenNumber(0)
                }
            );
        }
        if (field != '') {
            nodes.push(
                {
                    "name": fields?.find(f => f.id == field)?.name ?? "??",
                    "onClick": () => setScreenNumber(1)
                }
            );
        }
        if (speciality != '') {
            nodes.push(
                {
                    "name": specialities?.find(s => s.id == speciality)?.name ?? "??",
                    "onClick": () => setScreenNumber(2)
                }
            );
        }
        if (degree != '') {
            nodes.push(
                {
                    "name": degrees?.find(deg => deg.id == degree)?.name ?? "??",
                    "onClick": () => setScreenNumber(3 - (degree ? 1 : 0))
                }
            );
        }
        if (semester != '') {
            nodes.push(
                {
                    "name": semesterNames?.find(s => s.id == semester)?.name ?? "??",
                    "onClick": () => setScreenNumber(4)
                }
            );
        }

        return nodes;
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
                    <PathNavigator nodes={getNodesForPathNavigator().slice(0, screenNumber)} />
                </div>
            }
            {!collapsed &&
                <div className="guideContent">
                    {screenNumber == 0 && 
                        <_AddPlanGuideScreen options={localities.filter(l => studies.findIndex(s => s.locality == l.id) >= 0)} onSelect={(id) => selectLocality(id)}/>
                    }
                    {screenNumber == 1 && 
                        <_AddPlanGuideScreen options={fields.filter(fi => studies.findIndex(s => (s.locality == locality && s.field == fi.id)) >= 0)} onSelect={(id) => selectField(id)} />
                    }
                    {screenNumber == 2 && 
                        <_AddPlanGuideScreen options={degrees.filter(deg => studies.findIndex(s => (s.locality == locality && s.field == field && s.degree == deg.id)) >= 0)} onSelect={(id) => selectDegree(id)} />
                    }
                    {screenNumber == 4 &&
                        <_AddPlanGuideScreen options={semesters} onSelect={(id) => selectSemester(id)} />
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
            { buttons }
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
                    <FontAwesomeIcon icon={faSquareRootAlt}/>
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