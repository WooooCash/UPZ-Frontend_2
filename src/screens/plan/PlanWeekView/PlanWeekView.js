import { useEffect, useRef } from 'react/cjs/react.production.min';
import './PlanWeekView.css'

export default function PlanWeekView(props) {

    const ROW_HEIGHT = 50;
    const DAY_HEADER_HEIGHT = 50;
    const ADDITIONAL_TOP_OFFSET = 20;
    const HOURS_FONT_SIZE = 21;

    const FROM_HOUR = 7;
    const TO_HOUR = 22;

    const data = {
        monday: [{from:'8:30', to:'11:45', color:'#fc851e'}, 
                    {from:'12:00', to:'13:30', color:'#0f81fc'}, 
                    {from:'16:00', to:'17:30', color:'#64c954'}],
        tuesday: [{from:'10:15', to:'11:45', color:'#fc851e'},
                    {from:'14:00', to:'15:30', color:'#0f81fc'}],
        wednesday: [{from:'14:00', to:'14:45', color:'#fc851e'}],
        thursday: [{from:'10:15', to:'11:45', color:'#64c954'}, 
                    {from:'12:00', to:'13:30', color:'#0f81fc'}],
        friday: [{from:'8:30', to:'10:00', color:'#fc851e'}],
        saturday: [],
        sunday: [],
    }

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

    var mondayEvents = [];
    for (let event of data.monday) {
        mondayEvents.push(
            generateEventDiv(event)
        );
    }

    var tuesdayEvents = [];
    for (let event of data.tuesday) {
        tuesdayEvents.push(
            generateEventDiv(event)
        );
    }

    var wednesdayEvents = [];
    for (let event of data.wednesday) {
        wednesdayEvents.push(
            generateEventDiv(event)
        );
    }

    var thursdayEvents = [];
    for (let event of data.thursday) {
        thursdayEvents.push(
            generateEventDiv(event)
        );
    }

    var fridayEvents = [];
    for (let event of data.friday) {
        fridayEvents.push(
            generateEventDiv(event)
        );
    }

    var saturdayEvents = [];
    for (let event of data.saturday) {
        saturdayEvents.push(
            generateEventDiv(event)
        );
    }

    var sundayEvents = [];
    for (let event of data.sunday) {
        sundayEvents.push(
            generateEventDiv(event)
        );
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
                        {mondayEvents}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Wt.</div>
                        {tuesdayEvents}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Śr.</div>
                        {wednesdayEvents}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Czw.</div>
                        {thursdayEvents}
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Pt.</div>
                        {fridayEvents}
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

        return <div className='eventDisplay' style={{top: eventStartOffset, height: eventHeight, backgroundColor:event.color}}>
                Test test test test test test test test test test test test test test test
            </div>;
    }
}