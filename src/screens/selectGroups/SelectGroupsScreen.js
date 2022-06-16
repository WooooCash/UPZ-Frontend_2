import './SelectGroupsScreen.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getGroups } from '../../util/api';

const categoryNames = {
    'P': "Projekt Zespołowy",
    'Ps':"Pracownia Specjalistyczna",
    'W': "Wykład",
    'S': "Seminarium Dyplomowe",
    'J': "Język"
}

export default function SelectGroupsScreen(props) {

    const history = useHistory();

    const [groups, setGroups] = useState({});
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
		console.log("location state", props.location.state)
        if (props.location.state) {
            getGroups(props.location.state).then(result => {
                setGroups(result.fetchGroups.attributes) 
                // console.log("consultations", tempData)
                console.log("fetchGroups", result.fetchGroups.attributes)
                setLoading(false)
            });
        } else 
            setLoading(false)
    }, [])

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

	function createPlan() {
		let config = props.location.state;
		config['groups'] = selected.map(([key, group], i) => `${!i ? "[" : ""}"${group}"${i == selected.length-1 ? "]" : ""}`);
		console.log(config)
		history.push('/planTest', config)
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
                {groups && !loading && Object.entries(groups).map(([key, value]) => (
                    <div>
                        <h4>{categoryNames[key]}</h4>
                        <div className="category">
                            {value && value.map(group => (
                                <div className="group" onClick={() => moveToSelected(key, group)}>
                                    {group} 
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {Object.keys(groups).length == 0 && !loading && (
                    <div className="noGroupsContainer">
                        <h3>Musisz przejść dokonać wyboru semestru zanim możesz wybierać grupy.</h3>
                        <div className="noGroupsButton" onClick={() => history.push('/')}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Przejdź do wyboru semestru
                        </div>
                    </div>
                )}
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
				<div onClick={() => createPlan()}>Create Plan</div>
            </div>
        </div>
    );
}
