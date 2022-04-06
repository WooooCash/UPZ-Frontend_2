import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react/cjs/react.production.min';
import EventDisplay from './EventDisplay';
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

    // algorytm rozmieszczania eventów
    // https://stackoverflow.com/questions/11311410/visualization-of-calendar-events-algorithm-to-layout-events-with-maximum-width?utm_source=pocket_mylist

    // utworzenie lokalnej zmiennej na eventy (którą będzie można później modyfikować)
    let events = JSON.parse(JSON.stringify(props.events));

    // dodanie '0' do godzin, które nie mają zera na początku np. do '8:00', żeby było '08:00' (potrzebne do algorytmu ustawiającego eventy w ramach dnia)
    for (var event of events) {
        if (event.from.length < 5) event.from = '0' + event.from;
        if (event.to.length < 5) event.to = '0' + event.to;
    }

    // sortowanie eventów po atrybutach (w kolejności): dayNumber - from - to (posortowane eventy będą przydatne później)
    events.sort((a, b) => {
        if (a.dayNumber < b.dayNumber) return -1;
        if (a.dayNumber > b.dayNumber) return 1;

        if (a.from < b.from) return -1;
        if (a.from > b.from) return 1;

        if (a.to < b.to) return -1;
        if (a.to > b.to) return 1;
        return 0;
    });

    console.log("events in planweekview component", events);

    // rozmieszczanie eventów
    for (var event of events) {

        var startColumnNumber = 0; // pierwsza kolumna będzie miała numer 1 (w pierwszym obiegu pętli do-while jest ustawiana na 1) (bo może to być potrzebne w grid layout - a w grid layout numeracja kolumn zaczyna się od 1)

        // sprawdzenie kolizji
        var collidesWithAnotherEvent = false;
        do {
            collidesWithAnotherEvent = false;
            startColumnNumber++;
            // sprawdzenie, czy obecny event koliduje z jakimś innym eventem w danej podkolumnie
            if (events.filter((ev) => ev.column == startColumnNumber && ev.dayNumber == event.dayNumber && checkEventsHoursCollision(ev, event)).length > 0) {
                collidesWithAnotherEvent = true;
                // console.log('collision');
            }
        } while (collidesWithAnotherEvent == true);

        // console.log('final start column: ' + startColumnNumber);

        event.column = startColumnNumber;
    }

    // zmienna pomocnicza przechowująca liczbę podkolumn dla danej kolumny (dnia)
    var subColumnsCountForColumn = new Map();

    // zliczenie ile jest podkolumn dla danej kolumny
    for (let event of events) {
        if (!subColumnsCountForColumn.has(event.dayNumber)) {
            subColumnsCountForColumn.set(event.dayNumber, 1);
        } else {
            if ((event.column ?? 0) > subColumnsCountForColumn.get(event.dayNumber)) {
                subColumnsCountForColumn.set(event.dayNumber, event.column ?? 0);
            }
        }
    }

    // console.log(subColumnsCountForColumn);

    // ustalenie szerokości eventów
    for (var event of events) {
        if ((event.column ?? 0) <= 0) continue;

        var startColumnNumber = (event.column ?? 0);
        if (startColumnNumber <= 0) continue;

        let maxColumns = 1;
        if (subColumnsCountForColumn.has(event.dayNumber)) {
            maxColumns = subColumnsCountForColumn.get(event.dayNumber);
        }

        // console.log('max cols ' + maxColumns);

        event.columnSpan = 1;

        var collidesWithAnotherEvent = false;

        while (collidesWithAnotherEvent == false) {
            startColumnNumber++;
            // sprawdzenie, czy obecny event koliduje z jakimś innym eventem w danej podkolumnie
            if (events.filter((ev) => ev.column == startColumnNumber && ev.dayNumber == event.dayNumber && checkEventsHoursCollision(ev, event)).length > 0 ||
                startColumnNumber > maxColumns) {
                collidesWithAnotherEvent = true;
                // console.log('collision');
            } else {
                event.columnSpan++;
            }
        }
    }

    var eventsByDays = new Map();
    eventsByDays.set('1', []);
    eventsByDays.set('2', []);
    eventsByDays.set('3', []);
    eventsByDays.set('4', []);
    eventsByDays.set('5', []);
    eventsByDays.set('6', []);
    eventsByDays.set('7', []);
    
    for (let event of events) {
        if (eventsByDays.has(event.dayNumber)) {
            eventsByDays.get(event.dayNumber).push(generateEventDiv(event));
        }
    }

    // for (let event of events) {
    //     console.log('day: ' + event.dayNumber + ', from: ' + event.from + ', to: ' + event.to + ', column: ' + event.column + ', span: ' + event.columnSpan);
    // }

    return (
        <div className='planWeekViewMainContainer'>
            <div className='planWeekViewContent'>
                <div className='planWeekViewHoursColumn'>
                    {hoursComponents}
                </div>
                <div className='planWeekViewDays'>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Pon.</div>
                        <div style={{position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px', display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr '.repeat(subColumnsCountForColumn.get('1'))}}>
                            {eventsByDays.get('1')}
                        </div>
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Wt.</div>
                        <div style={{position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px', display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr '.repeat(subColumnsCountForColumn.get('2'))}}>
                            {eventsByDays.get('2')}
                        </div>
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Śr.</div>
                        <div style={{position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px', display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr '.repeat(subColumnsCountForColumn.get('3'))}}>
                            {eventsByDays.get('3')}
                        </div>
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Czw.</div>
                        <div style={{position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px', display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr '.repeat(subColumnsCountForColumn.get('4'))}}>
                            {eventsByDays.get('4')}
                        </div>
                    </div>
                    <div className='planWeekViewDayColumn'>
                        <div className='planWeekViewDayHeader' style={{ height: `${DAY_HEADER_HEIGHT}px` }}>Pt.</div>
                        <div style={{position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px', display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr '.repeat(subColumnsCountForColumn.get('5'))}}>
                            {eventsByDays.get('5')}
                        </div>
                    </div>
                </div>
            </div>
            {horizontalLinesComponents}
        </div>
    );

    function checkEventsHoursCollision(eventA, eventB) {
        return ((eventB.from >= eventA.from) && (eventB.from < eventA.to)) || ((eventB.to <= eventA.to) && (eventB.to > eventA.from));
    }

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

        let id = Math.round(Math.random() * 10000);

        let styleAttrs = {id: id, gridColumnStart: event.column, gridColumnEnd: event.column + event.columnSpan};

        return <EventDisplay key={event.id} styleAttrs={styleAttrs} color={event.color} fontColor={event.fontColor} top={eventStartOffset} height={eventHeight} roomNr={event.roomNr} name={event.name} person={event.person} parity={event.parity} other={event.other} />
    }
}