import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import './EventDisplay.css';

export default function EventDisply(props) {

    const [hovered, setHovered] = useState(false);

    let eventDisplayStyle = {
        backgroundColor: props.color ?? 'lightgrey', 
        color: props.fontColor ?? 'black',
        top: props.top ?? 0, 
        height: props.height,
    };

    let eventDisplayHoveredStyle = {
        backgroundColor: props.color ?? 'lightgrey', 
        color: props.fontColor ?? 'black',
        top: props.top ?? 0, 
        minHeight: props.height,
        height: 'auto',
        zIndex: 100,
    };
    
    let parity = props.parity ?? '0';
    let parityTitle = (parity == '1') ? 'Zajęcia w tygodnie nieparzyste' : 'Zajęcia w tygodnie parzyste';

    return (
        <div className='eventDisplay' style={hovered ? eventDisplayHoveredStyle : eventDisplayStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {parity != '0' &&
                <div className='eventDisplayParityDisplay' title={parityTitle}>{parity}</div>
            }
            <div className='eventDisplayTitleRow'>
                <div className='eventDisplayRoomNr'>{props.roomNr}</div>
                <div className='eventDisplayName'>{props.name}</div>
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