import React, {useState, useEffect} from "react";
import { getClassrooms, getConsultations, getPlans, getSubjects, getTeachers, getTitles } from "../../../util/api.js"
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
    const [titles, setTitles] = useState({})
    const [plans, setPlans] = useState({})
    const [subjects, setSubjects] = useState({})
    const [rooms, setRooms] = useState({})
    const [currentProf, setCurrentProf] = useState(0)
    const [events, setEvents] = useState([])


    useEffect(() => {
        getConsultations().then(result => {
            let tempData = {}
            for(let cons of result.fetchTutorships) 
                tempData[cons.teacherId] = {}
            
            for(let cons of result.fetchTutorships) {
                tempData[cons.teacherId][cons.id] = cons;
                tempData[cons.teacherId][cons.id].len = 1;
            }
            setConsultations(tempData);
        });
        getPlans().then(result => {
            let tempData = {}
            for(let plan of result.fetchPlans)
                tempData[plan.teacherId] = {}
            
            for(let plan of result.fetchPlans) {
                tempData[plan.teacherId][plan.id] = plan
            }
            setPlans(tempData)
        });
        getTeachers().then(result => {
            let tempData = {}
 
            for (let t of result.fetchTeachersWithTutorshipsAndPlans)
                t.fullName = t.name ? t.name + " " + t.lastName : t.lastName;
            for(let t of result.fetchTeachersWithTutorshipsAndPlans) 
                tempData[t.id] = t
            
            setTeachers(tempData);
        });
        getTitles().then(result => {
            let tempData = {};
            for(let t of result.fetchTitles) 
                tempData[t.id] = t.name;
            
            setTitles(tempData);
        });
        getSubjects().then(result => {
            let tempData = {};
            for(let s of result.fetchSubjects) 
                tempData[s.id] = s;
            
            setSubjects(tempData);
        });
        getClassrooms().then(result => {
            let tempData = {};
            for(let c of result.fetchClassrooms) 
                tempData[c.id] = c.name;
            
            setRooms(tempData);
        });
        
    }, [])

    const switchProf = (e) => {
        let profId = e.target.value;
        let profName = e.target.options[e.target.selectedIndex].text;
        setCurrentProf(profId)
        prepareData(profId, profName);
    }

    const prepareConsultationsData = (id, name) => {
        var cons_arr = []
        try { // check if professor actually has any consultations
            cons_arr = structuredClone(Object.values(consultations[id])) //clone so that descriptions don't keep adding on every time we switch back to a teacher
        } catch (error) {
            console.log("Chosen prof has no consultations")
            return
        }

        let merged_arr = cons_arr.reduce((prev, next) => {
            var latest = prev[prev.length - 1];
            if (latest 
                && latest.typed === next.typed 
                && latest.day === next.day
                && next.hour - latest.hour <= latest.len) {
                    latest.len += 1;
                    if (latest.description !== next.description)
                        latest.description += " " + next.description
            } else 
                prev.push(next);
            
            return prev;
        }, []);

        var evs = merged_arr.map((cons) => {
            let title = titles[teachers[id].titleId] || "";
            var event = {
                dayNumber: cons.day.toString(),
                from: hours[cons.hour-1][0],
                to: hours[cons.hour + cons.len - 2][1],
                color: (!cons.typed ? '#64c954' : "#50C7C7"),
                person: title + " " + name,
                other: cons.description
            }
            return event;
        })

        return evs;
    }

    const preparePlanData = (id, name) => {
        var plan_arr = []
        try { // check if professor actually has any consultations
            plan_arr = structuredClone(Object.values(plans[id])).filter(plan => plan.day <= 5) //TODO: once planview is adjusted for 7 days this can go
        } catch (error) {
            console.log("Chosen prof has no plans")
            return
        }

        var evs = plan_arr.map((plan) => {

            let title = titles[teachers[id].titleId] || "";
            var event = {
                name: subjects[plan.subjectId].shorterName,
                fullName: subjects[plan.subjectId].name,
                roomNr: rooms[plan.classroomId],
                dayNumber: plan.day.toString(),
                from: hours[plan.hour-1][0],
                to: hours[plan.hour + plan.amount - 2][1],
                color: '#D6D311',
                person: title + " " + name,
            }
            return event;
        })

        return evs;
    }

    const prepareData = (id, name) => {
        const cons_evs = prepareConsultationsData(id, name)
        const plan_evs = preparePlanData(id, name)

        var all_evs = []
        all_evs = all_evs.concat(cons_evs ?? [])
        all_evs = all_evs.concat(plan_evs ?? [])

        setEvents(all_evs)
    }

    return(
        <div>
            <div className="select-form">
                <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

                </div>
                <label>Wybierz profesora</label>
                <br />
                <select name="profs" id="profs" defaultValue="0" onChange={switchProf}>
                        <option value="0" disabled>--Select--</option>
                        {Object.keys(teachers).map((profId) => (
                            <option value={profId}>{teachers[profId].fullName}</option>
                        ))}
                </select>
            </div>

            <div className="schedule-view">
                {events.length == 0 && (<p>Nothing to see here B)</p>)}
                {events.length != 0 && (<PlanWeekView events={events}/>)}
            </div>
        </div>
    )
}
