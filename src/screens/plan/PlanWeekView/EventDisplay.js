import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import './EventDisplay.css';

export default function EventDisplay(props) {

    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    let eventDisplayStyle = {
        backgroundColor: props.color ?? 'lightgrey', 
        color: props.fontColor ?? 'black',
        top: props.top ?? 0, 
        height: props.height,
        width: props.width ?? 'auto',
        ...props.styleAttrs,
    };

    let eventDisplayHoveredStyle = {
        backgroundColor: props.color ?? 'lightgrey', 
        color: props.fontColor ?? 'black',
        top: props.top ?? 0, 
        minHeight: props.height,
        height: 'auto',
        width: props.width ?? 'auto',
        // overflow: 'visible',
        zIndex: 100,
        ...props.styleAttrs,
    };
    let eventClicked = {
        display: 'block', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        zIndex: '10', /* Sit on top */
        left: '20vw',
        top: '35vh',
        width: '50%', /* Full width */
        height: '25%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: props.color ?? 'lightgrey', /* Fallback color */
        ...props.styleAttrs,
    };

    let eventClicked2 = {
        backgroundColor: '#fefefe',
        margin: '15% auto', /* 15% from the top and centered */
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        ...props.styleAttrs,
    };

    let eventClicked3 = {
        color: 'red',
        ...props.styleAttrs,
    };
    let parity = props.parity ?? '0';
    let parityTitle = (parity == '1') ? 'Zajęcia w tygodnie nieparzyste' : 'Zajęcia w tygodnie parzyste';

    return (
        <div className='eventDisplay' style={{ ... hovered ? eventDisplayHoveredStyle : eventDisplayStyle, ... clicked ? eventClicked : '' }} onClick= {()=> clicked ? setClicked(false) : setClicked(true) } onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {parity != '0' &&
                <div className='eventDisplayParityDisplay' title={parityTitle}>{parity}</div>
            }
            
            <div className='eventDisplayTitleRow'>
                <div className='eventDisplayRoomNr'>{props.roomNr}</div>
                <div className='eventDisplayName'>{clicked ? (props.fullName ?? props.name) : props.name}</div>
            </div>
            {props.person &&
            <div className='eventDisplayPersonNameRow'>
                <FontAwesomeIcon icon={faChalkboardTeacher} style={{marginRight: '5px'}}/>
                <div className='eventDisplayPersonName'>{props.person}</div>
            </div>

            }
            {props.other &&
                <div className='eventDisplayOther'>{props.other}</div>
            }
        </div>
    );
}