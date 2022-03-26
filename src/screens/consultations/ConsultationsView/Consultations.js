import React, {useState, useEffect} from "react";
import { getConsultations, getTeachers } from "../../../util/api.js"
import "./Consultations.css"



const hours = [
    ["8.30", "9.15"],
    ["9.15", "10.00"],
    ["10.15", " 11.00"],
    ["11.00", " 11.45"],
    ["12.00", " 12.45"],
    ["12.45", " 13.30"],
    ["14.00", " 14.45"],
    ["14.45", " 15.30"],
    ["16.00", " 16.45"],
    ["16.45", " 17.30"],
    ["17.40", " 18.25"],
    ["18.25", " 19.10"],
    ["19.20", " 20.05"],
    ["20.05", " 20.50"],
]

export default function Conultations(props) {

    const [consultations, setConsultations] = useState({})
    const [teachers, setTeachers] = useState({})
    const [currentProf, setCurrentProf] = useState(0)
    const [profName, setProfName] = useState("")


    useEffect(() => {
        let jsonArrConsultations = getConsultations().then(result => {
            let tempData = {}
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId] = {}
            }
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId][cons.id] = cons
            }
            console.log("consultations", tempData)
            setConsultations(tempData);
        });
        let jsonArrTeachers = getTeachers().then(result => {
            let tempData = {}
            for(let teacher of result.fetchTeachers) {
                let fullName = teacher.lastName
                if (teacher.name != null)
                    fullName = teacher.name + " " + teacher.lastName;
                if (teacher.lastName.slice(0, 1) != "(")
                    tempData[fullName] = teacher;
            }
            console.log("teachers", tempData)
            setTeachers(tempData);
        });
    }, [])

    const switchProf = (e) => {
        setCurrentProf(e.target.value)
        setProfName(e.target.options[e.target.selectedIndex].text)
        console.log("currProf", e.target.value)
        console.log("profName", e.target.options[e.target.selectedIndex].text)
    }

    const showCurrentProfCons = () => {
        console.log(consultations[currentProf])
        Object.entries(consultations[currentProf]).map((consId) => {
            console.log(consId[0], consId[1])
        })
    }

    return(
        <div>
            <button onClick={showCurrentProfCons}>show</button>
            <div className="select-form">
                <label>Wybierz profesora</label>
                <br />
                <select name="profs" id="profs" onChange={switchProf}>
                        <option value="0" selected disabled>--Select--</option>
                        {Object.entries(teachers).map((prof) => (
                            <option value={prof[1].id}>{prof[0]}</option>
                        ))}
                </select>
            </div>

            <div className="schedule-view">
                {!consultations[currentProf] && (<p>Nothing to see here B)</p>)}
                { consultations[currentProf] && Object.entries(consultations[currentProf]).map((consId) => (
                    <div>
                        <h2>Consultation ID: {consId[0]}</h2>
                        <div style={{marginLeft:"40px"}}>
                            <p>Hour: {consId[1].hour}</p>
                            <p>From: {hours[consId[1].hour-1][0]}</p>
                            <p>To: {hours[consId[1].hour-1][1]}</p>
                            <p>dayNumber: {consId[1].day}</p>
                            <p>color: green</p>
                            <p>Teacher ID: {consId[1].teacherId}</p>
                            <p>person: {profName}</p>
                            <p>other: {consId[1].description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}