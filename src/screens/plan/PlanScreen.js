import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPlansForGroups } from '../../util/api.js';
import './PlanScreen.css';
import PlanWeekView from './PlanWeekView/PlanWeekView';



	
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

export default function PlanScreen(props) {
	// const events = [
	//     {dayNumber: '1', from:'8:30', to:'11:45', color:'#fc851e', roomNr:'122', name:'BSK', person:'Anna Mazur', parity:'1', other:'Other information about this subject'},
	//     {dayNumber: '1', from:'12:00', to:'13:30', color:'#0f81fc', fontColor:'white', roomNr:'120', name:'SW'},
	//     {dayNumber: '1', from:'12:30', to:'15:30', color:'#64c954', roomNr:'020', name:'BSK'},
	//     {dayNumber: '1', from:'13:45', to:'15:30', color:'#64c954', roomNr:'126', name:'Java'},
	//     {dayNumber: '1', from:'13:00', to:'17:00', color:'#fc851e', roomNr:'208', name:'Linux'},
	//     {dayNumber: '1', from:'16:00', to:'17:30', color:'#64c954', roomNr:'202', name:'SW'},
	//     {dayNumber: '2', from:'10:15', to:'11:45', color:'#fc851e', roomNr:'32c', name:'Linux'},
	//     {dayNumber: '2', from:'14:00', to:'15:30', color:'#0f81fc', fontColor:'white', roomNr:'040', name:'Linux', person:'Jan Kowalski'},
	//     {dayNumber: '3', from:'14:00', to:'14:45', color:'#fc851e', roomNr:'WA-12B', name:'Linux', person:'Jan Kowalski'},
	//     {dayNumber: '4', from:'10:15', to:'11:45', color:'#64c954', roomNr: 'WA-12B', name: 'BSK'},
	//     {dayNumber: '4', from:'12:00', to:'13:30', color:'#0f81fc', fontColor:'white', roomNr:'17c', name:'Java', person:'Wojciech Nowak', parity: '2'},
	//     {dayNumber: '5', from:'8:30', to:'10:00', color:'#fc851e', roomNr:'124', name:'Java', person:'Wojciech Nowak', other:'Sample description of a subject'},
	// ];
	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(true);
	const [prepared, setPrepared] = useState(false);
	const [events, setEvents] = useState([])
   
	useEffect(() => {
		console.log('location state', props.location.state);
		if (props.location.state) {
			getPlansForGroups(props.location.state).then((result) => {
				setPlans(result.fetchPlanToExistingGroup);
				console.log(result.fetchPlanToExistingGroup);
				setLoading(false)
			});
		} else setLoading(false);
	}, []);

	const preparePlanData = () => {
		var evs = plans.map((plan) => {
			var event = {
				name: "test name",
				fullName: "full name",
				roomNr: "69",
				dayNumber: plan.day.toString(),
				from: hours[plan.hour-1][0],
				to: hours[plan.hour + plan.amount - 2][1],
				person: "dr. Test"
			}
			return event;
		})
		setEvents(evs);
		setPrepared(true)
		console.log("evs", evs)
	}

	return (
		<div className="planScreenMainContainer">
			<div className="planScreenPlanName">Plan zajęć</div>
			{!loading && events.length == 0 && (<p>Nothing to see here B)</p>)}
			{!loading && events.length != 0 && (<PlanWeekView events={events}/>)}
			{!loading && !prepared && preparePlanData()}
		</div>
	);
}
