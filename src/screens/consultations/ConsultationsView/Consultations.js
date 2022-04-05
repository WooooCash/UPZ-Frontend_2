import React, {useState, useEffect} from "react";
import { getConsultations, getTeachers } from "../../../util/api.js"
import PlanWeekView from '../../plan/PlanWeekView/PlanWeekView'
import "./Consultations.css"



const hours = [
    ["8:30", "9:15"],
    ["9:15", "10:00"],
    ["10:15", "11:00"],
    ["11:00", "11:45"],
    ["12:00", "12:45"],
    ["12:45", "13:30"],
    ["14:00", "14:45"],
    ["14:45", "15:30"],
    ["16:00", "16:45"],
    ["16:45", "17:30"],
    ["17:40", "18:25"],
    ["18:25", "19:10"],
    ["19:20", "20:05"],
    ["20:05", "20:50"],
]

export default function Conultations(props) {

    const [consultations, setConsultations] = useState({})
    const [teachers, setTeachers] = useState({})
    const [currentProf, setCurrentProf] = useState(0)
    const [profName, setProfName] = useState("")
    const [events, setEvents] = useState([])


    useEffect(() => {
        console.log("api call")
        getConsultations().then(result => {
            let tempData = {}
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId] = {}
            }
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId][cons.id] = cons
            }
            setConsultations(tempData);
        });
        getTeachers().then(result => {
            let tempData = {}
            for(let teacher of result.fetchTeachers) {
                let fullName = teacher.lastName
                if (teacher.name != null)
                    fullName = teacher.name + " " + teacher.lastName;

                tempData[fullName] = teacher;
            }
            setTeachers(tempData);
        });
    }, [])

    const switchProf = (e) => {
        let profId = e.target.value;
        let profName = e.target.options[e.target.selectedIndex].text;
        setCurrentProf(profId)
        setProfName(profName)
        prepareData(profId, profName);
    }

    const prepareData = (id, name) => {
        var evs = Object.entries(consultations[id]).map((consId) => {
            var event = {
                dayNumber: consId[1].day.toString(),
                from: hours[consId[1].hour-1][0],
                to: hours[consId[1].hour-1][1],
                color: '#64c954',
                person: name,
                other: consId[1].description
            }

            return event;
        })
        setEvents(evs)
    }

    return(
        <div>
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
                {consultations[currentProf] && (<PlanWeekView events={events}/>)}
            </div>
        </div>
    )
}