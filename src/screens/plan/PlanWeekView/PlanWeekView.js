import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react/cjs/react.production.min';
import EventTile from './EventDisplay';
import './PlanWeekView.css'

export default function PlanWeekView(props) {

    const ROW_HEIGHT = 50;
    const DAY_HEADER_HEIGHT = 50;
    const ADDITIONAL_TOP_OFFSET = 20;
    const HOURS_FONT_SIZE = 21;

    const FROM_HOUR = 7;
    const TO_HOUR = 22;

    var hoursComponents = [];
    var horizontalLinesComponents = [];

    for (var i = FROM_HOUR; i < TO_HOUR; i++) {

        var hourMarkerStyle = {};
        hourMarkerStyle.marginTop = ((i - FROM_HOUR == 0) ? ADDITIONAL_TOP_OFFSET : 0) + ROW_HEIGHT - ((i - FROM_HOUR == 0) ? HOURS_FONT_SIZE / 2 : HOURS_FONT_SIZE);

        hoursComponents.push(
            <div key={i} className='planWeekViewHour' style={hourMarkerStyle}>
                {i + ':00'}
            </div>
        )

        var hourHorizontalLineStyle = {};
        hourHorizontalLineStyle.left = '45px';
        hourHorizontalLineStyle.right = '0px';
        hourHorizontalLineStyle.top = ADDITIONAL_TOP_OFFSET + ROW_HEIGHT + (i - FROM_HOUR) * ROW_HEIGHT;

        horizontalLinesComponents.push(
            <div key={i} className='horizontalLine' style={hourHorizontalLineStyle}></div>
        )
    }

    var eventsByDays = new Map();
    eventsByDays.set('1', []);
    eventsByDays.set('2', []);
    eventsByDays.set('3', []);
    eventsByDays.set('4', []);
    eventsByDays.set('5', []);
    eventsByDays.set('6', []);
    eventsByDays.set('7', []);
    
    for (let event of props.events) {
        if (eventsByDays.has(event.dayNumber)) {
            eventsByDays.get(event.dayNumber).push(generateEventDiv(event));
        }
    }

    return (
        <div className='planWeekViewMainContainer'>
            <div className='planWeekViewContent'>
                <div className='planWeekViewHoursColumn'>
                    {hoursComponents}
                </div>
                <div className='planWeekViewDays'>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Pon.</div>
                        {eventsByDays.get('1')}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Wt.</div>
                        {eventsByDays.get('2')}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Śr.</div>
                        {eventsByDays.get('3')}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Czw.</div>
                        {eventsByDays.get('4')}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Pt.</div>
                        {eventsByDays.get('5')}
                    </div>
                </div>
            </div>
            {horizontalLinesComponents}
        </div>
    );

    function generateEventDiv(event) {
        let eventFromTime = event.from.split(':');
        let eventFromHour = Number.parseInt(eventFromTime[0] ?? '0');
        let eventFromMinute = Number.parseInt(eventFromTime[1] ?? '0');

        let eventToTime = event.to.split(':');
        let eventToHour = Number.parseInt(eventToTime[0] ?? '0');
        let eventToMinute = Number.parseInt(eventToTime[1] ?? '0');

        let eventLengthInMinutes = (eventToHour - eventFromHour) * 60 + (eventToMinute - eventFromMinute);

        let eventStartOffset = DAY_HEADER_HEIGHT + ADDITIONAL_TOP_OFFSET + (eventFromHour * 60 + eventFromMinute - FROM_HOUR * 60) / 60 * ROW_HEIGHT;
        let eventHeight = eventLengthInMinutes / 60 * ROW_HEIGHT;

        return <EventTile color={event.color} fontColor={event.fontColor} top={eventStartOffset} height={eventHeight} roomNr={event.roomNr} name={event.name} person={event.person} parity={event.parity} other={event.other} />
    }
}