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
    const [loading, setLoading] = useState(true);
    const [planName, setPlanName] = useState("");
    const [isPlanNameWarningVisible, setIsPlanNameWarningVisible] = useState(false);


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
        console.log("planName: " + planName);
        if (planName.trim() == '') {
            setIsPlanNameWarningVisible(true);
            return;
        }

		let config = props.location.state;

		let selected = getSelected()
        let formattedSelected = selected.map((entry, i) => `${!i ? "[" : ""}"${entry.group.group}"${i == selected.length-1 ? "]" : ""}`)
		config['groups'] = formattedSelected;

        // zapisanie planu do LocalStorage
        var savedPlans = window.localStorage.getItem("savedPlans");
        if (savedPlans == null) savedPlans = [];
        else savedPlans = JSON.parse(savedPlans);
        console.log(savedPlans);
        savedPlans.push({
            "name": planName, //todo: zapisanie nazwy dodanej przez uytkownika
            ...config,
        })
        window.localStorage.setItem("savedPlans", JSON.stringify(savedPlans));
		config['planName'] = planName;

        // przekierowanie na stronę z planem zajęć
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
				<h4 style={{display: "inline"}}>Podsumowanie</h4>
                <input class="selectGroupsPlanNameInput" type="text" placeholder="Podaj nazwę planu" value={planName} onChange={(event) => {
                    let newPlanName = event.target.value;
                    if (newPlanName.trim() == '') setIsPlanNameWarningVisible(true);
                    setPlanName(event.target.value);
                    }}/>
                <label hidden={!isPlanNameWarningVisible} style={{color: "red"}}>Pole musi być wypełnione</label>
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
