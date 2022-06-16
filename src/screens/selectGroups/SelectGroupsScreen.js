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
    const [loading, setLoading] = useState(true)


	useEffect(() => {
		if (props.location.state) {
			getGroups(props.location.state).then((result) => {
				let tempdata = result.fetchGroups.attributes
				for (let x of Object.keys(tempdata)) 
					for (let [i, g] of tempdata[x].entries()) 
						tempdata[x][i] = {group: g, selected: false}

				setGroups(result.fetchGroups.attributes);
				setLoading(false);
			});
		} else setLoading(false);
	}, []);


	function getSelected() {
		let selectedGroups = []

		for (let x of Object.keys(groups)) 
			for (let g of groups[x]) 
				if (g.selected) selectedGroups.push({key: x, group: g})

		return selectedGroups
	}

	function toggleSelected(key, group) {
		let newGroups = {...groups}

		let gIdx = newGroups[key].indexOf(group)
		newGroups[key][gIdx].selected = !newGroups[key][gIdx].selected;

		setGroups(newGroups)
	}


	function createPlan() {
		let config = props.location.state;

		let selected = getSelected()
		config['groups'] = selected.map((entry, i) => `${!i ? "[" : ""}"${entry.group.group}"${i == selected.length-1 ? "]" : ""}`);

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
								<div className={group.selected ? "groupSelected" : "group"} onClick={() => toggleSelected(key, group)}>
                                    {group.group} 
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
					{getSelected().map((g) => (
                        <div className="groupSelected" onClick={() => toggleSelected(g.key, g.group)}>
                            {g.group.group} 
                        </div>
					))}
                </div>
				<div className="selectGroupsCreatePlan" onClick={() => createPlan()}>Create Plan</div>
            </div>
        </div>
    );
}
