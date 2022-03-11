import React, {useState, useEffect} from "react";
import { getConsultations, getTeachers } from "../../../util/api.js"
import "./Consultations.css"




export default function Conultations(props) {

    const [consultations, setConsultations] = useState({})
    const [teachers, setTeachers] = useState({})
    const [currentProf, setCurrentProf] = useState(0)


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
        console.log("currProf", e.target.value)
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
                            <p>Teacher ID: {consId[1].teacherId}</p>
                            <p>Day: {consId[1].day}</p>
                            <p>Hour: {consId[1].hour}</p>
                            <p>Description: {consId[1].description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}