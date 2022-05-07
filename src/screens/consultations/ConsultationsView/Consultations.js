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
    const [teachers, setTeachers] = useState([])
    const [currentProf, setCurrentProf] = useState(0)
    const [events, setEvents] = useState([])


    useEffect(() => {
        getConsultations().then(result => {
            let tempData = {}
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId] = {}
            }
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId][cons.id] = cons;
                tempData[cons.teacherId][cons.id].len = 1;
            }
            setConsultations(tempData);
        });
        getTeachers().then(result => {
            let tempData = result.fetchTeachers
 
            for (const t of tempData)
                t.fullName = t.name ? t.name + " " + t.lastName : t.lastName;

            setTeachers(tempData);
        });
    }, [])

    const switchProf = (e) => {
        let profId = e.target.value;
        let profName = e.target.options[e.target.selectedIndex].text;
        setCurrentProf(profId)
        prepareData(profId, profName);
    }

    const prepareData = (id, name) => {
        const cons_arr = Object.values(consultations[id])

        let merged_arr = cons_arr.reduce((prev, next) => {
            var latest = prev[prev.length - 1];
            if (latest 
                && latest.description == next.description 
                && latest.day == next.day
                && next.hour - latest.hour <= latest.len) {
                    latest.len += 1;
            } else 
                prev.push(next);
            
            return prev;
        }, []);

        var evs = merged_arr.map((cons) => {
            var event = {
                dayNumber: cons.day.toString(),
                from: hours[cons.hour-1][0],
                to: hours[cons.hour + cons.len - 2][1],
                color: '#64c954',
                person: name,
                other: cons.description
            }

            return event;
        })
        setEvents(evs)
    }

    return(
        <div>
            <div className="select-form">
                <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

                </div>
                <label>Wybierz profesora</label>
                <br />
                <select name="profs" id="profs" onChange={switchProf}>
                        <option value="0" selected disabled>--Select--</option>
                        {teachers.map((prof) => (
                            <option value={prof.id}>{prof.fullName}</option>
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