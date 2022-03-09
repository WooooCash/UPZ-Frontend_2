import './PlanScreen.css';
import PlanWeekView from './PlanWeekView/PlanWeekView';

export default function PlanScreen(props) {
    return (
        <div className='planScreenMainContainer'>
            <div className='planScreenPlanName'>Plan zajęć</div>
            <PlanWeekView />
        </div>
    );
}