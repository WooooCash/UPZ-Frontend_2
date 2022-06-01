import './SelectGroupsScreen.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const groupData = {
    'cw': ['cw1', 'cw2', 'cw3', 'cw4'],
    'ps': ['ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'ps6', 'ps7', 'ps8'],
    'lab': ['lab1', 'lab2'],
}

export default function SelectGroupsScreen(props) {

    const history = useHistory();

    const [groups, setGroups] = useState(groupData);
    const [selected, setSelected] = useState([])

    function moveToSelected(key, group) {
        let obj = [key, group]
        setSelected([...selected, obj])
        
        let newGroups = {...groups}
        newGroups[key] = newGroups[key].filter(g => g !== group)
        setGroups(newGroups)
    }

    function removeFromSelected(key, group) {
        let newGroups = {...groups}
        newGroups[key].push(group)
        setGroups(newGroups)

        setSelected(selected.filter(([k, g]) => g !== group))
    }

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
                {Object.entries(groups).map(([key, value]) => (
                    <div>
                        <h4>{key}</h4>
                        <div className="category">
                            {value && value.map(group => (
                                <div className="group" onClick={() => moveToSelected(key, group)}>
                                    {group} 
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="selectGroupsScreenSummaryView">
                <h4>Podsumowanie</h4>
                <div className="category">
                    {selected.map(([key, group]) => (
                        <div className="group" onClick={() => removeFromSelected(key, group)}>
                            {group} 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}