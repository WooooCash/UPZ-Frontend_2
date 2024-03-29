import { useEffect, useState } from 'react';
import NavBar from "./../components/NavBar/NavBar"
import { useHistory } from 'react-router-dom';
import {
	getPlansForGroups,
	getTeachers,
	getTitles,
	getClassrooms,
	getSubjects
} from '../../util/api.js';
import './PlanScreen.css';
import PlanWeekView from './PlanWeekView/PlanWeekView';

const hours = [
	['8:30', '9:15'],
	['9:15', '10:00'],
	['10:15', '11:00'],
	['11:00', '11:45'],
	['12:00', '12:45'],
	['12:45', '13:30'],
	['14:00', '14:45'],
	['14:45', '15:30'],
	['16:00', '16:45'],
	['16:45', '17:30'],
	['17:40', '18:25'],
	['18:25', '19:10'],
	['19:20', '20:05'],
	['20:05', '20:50']
];

const colours = {
	Ps: '#6faec9',
	W: '#7ac96f',
	Ćw: '#bcc96f'
};

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
	const [teachers, setTeachers] = useState({});
	const [titles, setTitles] = useState({});
	const [subjects, setSubjects] = useState({});
	const [rooms, setRooms] = useState({});
	const [loading, setLoading] = useState(true);
	const [prepared, setPrepared] = useState(false);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		if (props.location.state) {
			console.log(props.location.state)
			let counter = 0;

			getTeachers().then((result) => {
				let tempData = {};
				for (let teacher of result.fetchTeachersWithTutorshipsAndPlans)
					tempData[teacher.id] = teacher;

				setTeachers(tempData);

				counter++;
				loadingCounter(counter);
			});

			getTitles().then((result) => {
				let tempData = {};
				for (let title of result.fetchTitles)
					tempData[title.id] = title;

				setTitles(tempData);

				counter++;
				loadingCounter(counter);
			});

			getSubjects().then((result) => {
				let tempData = {};
				for (let subject of result.fetchSubjects)
					tempData[subject.id] = subject;

				setSubjects(tempData);

				counter++;
				loadingCounter(counter);
			});

			getClassrooms().then((result) => {
				let tempData = {};
				for (let room of result.fetchClassrooms)
					tempData[room.id] = room;

				setRooms(tempData);

				counter++;
				loadingCounter(counter);
			});

			getPlansForGroups(props.location.state).then((result) => {
				setPlans(result.fetchPlanToExistingGroup);

				counter++;
				loadingCounter(counter);
			});
		} else setLoading(false);
	}, []);

	useEffect(() => {
		if (!loading) preparePlanData();
	}, [loading]);

	function loadingCounter(count) {
		if (count >= 5) 
			setLoading(false);
	}

	const preparePlanData = () => {
		var evs = plans.map((plan) => {
			let teacher = teachers[plan.teacherId];
			let title = titles[teachers[plan.teacherId].titleId].name || '';

			var event = {
				name: subjects[plan.subjectId].shorterName,
				fullName: subjects[plan.subjectId].name,
				roomNr: rooms[plan.classroomId].name,
				group: plan.subjectType + plan.group,
				dayNumber: plan.day.toString(),
				from: hours[plan.hour - 1][0],
				to: hours[plan.hour + plan.amount - 2][1],
				color: colours[plan.subjectType] ?? '#d3bcd4',
				person: `${title} ${teacher.name} ${teacher.lastName}`
			};
			return event;
		});
		setEvents(evs);
		setPrepared(true);
	};

	var planName = "";
	if (props.location.state && props.location.state.planName)
		planName = `- ${props.location.state.planName}`;

	return (
		<div className="planScreenMainContainer">
			<NavBar />
			<div className="planScreenPlanName">
				Plan zajęć {planName}
			</div>
			{!loading && events.length == 0 && <p>Nothing to see here B)</p>}
			{!loading && events.length != 0 && <PlanWeekView events={events} />}
		</div>
	);
}
