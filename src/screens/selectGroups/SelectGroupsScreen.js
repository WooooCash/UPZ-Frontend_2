import './SelectGroupsScreen.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function SelectGroupsScreen(props) {

    const history = useHistory();

    return (
        <div className="selectGroupsScreenMainContainer">
            <div className="selectGroupsScreenNavBar">
                <div className="selectGroupsScreenBackButton" onClick={() => history.push('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className='selectGroupsScreenTitle'>
                    Wybierz grupy
                </div>
            </div>
            <div className="selectGroupsScreenContent">
                Lista grup
            </div>
            <div className="selectGroupsScreenSummaryView">
                Podsumowanie
            </div>
        </div>
    );
}