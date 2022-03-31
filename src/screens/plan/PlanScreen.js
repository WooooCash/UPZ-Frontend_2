import './PlanScreen.css';
import PlanWeekView from './PlanWeekView/PlanWeekView';

export default function PlanScreen(props) {

    const events = [
        {dayNumber: '1', from:'8:30', to:'11:45', color:'#fc851e', roomNr:'122', name:'BSK', person:'Anna Mazur', parity:'1', other:'Other information about this subject'}, 
        {dayNumber: '1', from:'12:00', to:'13:30', color:'#0f81fc', fontColor:'white', roomNr:'120', name:'SW'},
        {dayNumber: '1', from:'12:30', to:'15:30', color:'#64c954', roomNr:'020', name:'BSK'}, 
        {dayNumber: '1', from:'13:45', to:'15:30', color:'#64c954', roomNr:'126', name:'Java'}, 
        {dayNumber: '1', from:'13:00', to:'17:00', color:'#fc851e', roomNr:'208', name:'Linux'}, 
        {dayNumber: '1', from:'16:00', to:'17:30', color:'#64c954', roomNr:'202', name:'SW'},
        {dayNumber: '2', from:'10:15', to:'11:45', color:'#fc851e', roomNr:'32c', name:'Linux'},
        {dayNumber: '2', from:'14:00', to:'15:30', color:'#0f81fc', fontColor:'white', roomNr:'040', name:'Linux', person:'Jan Kowalski'},
        {dayNumber: '3', from:'14:00', to:'14:45', color:'#fc851e', roomNr:'WA-12B', name:'Linux', person:'Jan Kowalski'},
        {dayNumber: '4', from:'10:15', to:'11:45', color:'#64c954', roomNr: 'WA-12B', name: 'BSK'}, 
        {dayNumber: '4', from:'12:00', to:'13:30', color:'#0f81fc', fontColor:'white', roomNr:'17c', name:'Java', person:'Wojciech Nowak', parity: '2'},
        {dayNumber: '5', from:'8:30', to:'10:00', color:'#fc851e', roomNr:'124', name:'Java', person:'Wojciech Nowak', other:'Sample description of a subject'},
    ];

    return (
        <div className='planScreenMainContainer'>
            <div className='planScreenPlanName'>Plan zajęć</div>
            <PlanWeekView events={events}/>
        </div>
    );
}