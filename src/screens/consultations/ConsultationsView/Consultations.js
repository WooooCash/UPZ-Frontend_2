import React, {useState} from "react";


const profs = {
    "Imie Nazwisko": 1,
    "jsfkl djsfklsdf": 2,
    "fjidjsf fsjakdlf": 3
}

const schedules = {
    1: {
        "Mon": {
            "9.30": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            },
            "12.30": {
                "type": 0,
                "name": "PZ",
                "duration": 2
            }
        },
        "Tue": {
            "9.30": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            }
        }
    },
    2: {
        "Mon": {
            "10.30": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            },
            "12.30": {
                "type": 0,
                "name": "KCK",
                "duration": 2
            }
        },
        "Tue": {
            "13.30": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            },
            "16.30": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            }
        }
    },
    3: {

    }
}

export default function Conultations(props) {

    const [currentProf, setCurrentProf] = useState(0)

    const switchProf = (e) => {
        setCurrentProf(e.target.value)
    }

    return(
        <div>
            <label for="profs">Wybierz profesora</label>
            <select name="profs" id="profs" onChange={switchProf}>
                    <option value="0">--Select--</option>
                {Object.entries(profs).map((prof) => (
                    <option value={prof[1]}>{prof[0]}</option>
                ))}
            </select>
            <hr/>
            <div className="schedule-view">
                Schedule View
                <hr />
                {schedules[currentProf] && Object.entries(schedules[currentProf]).map((day) => (
                    <div>
                        <h3>{day[0]}</h3>
                        {Object.entries(schedules[currentProf][day[0]]).map((hour) => (
                            <div>
                                <h4>{hour[0]}</h4>
                                <p>{schedules[currentProf][day[0]][hour[0]].name}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}