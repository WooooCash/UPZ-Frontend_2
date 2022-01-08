import React, {useState} from "react";
import "./Consultations.css"


const profs = {
    "Imie Nazwisko": 1,
    "Imie2 Nazwisko2": 2,
    "Imie3 Nazwisko3": 3
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
        "Mon": {
            "8.00": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            },
            "10:15": {
                "type": 0,
                "name": "SM",
                "duration": 3
            }
        },
        "Tue": {
            "12.45": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            },
            "15.30": {
                "type": 0,
                "name": "ZTP",
                "duration": 2
            }
        },
        "Wed": {
            "9.15": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            },
            "15.30": {
                "type": 1,
                "name": "konsultacje",
                "duration": 1
            }
        }
    }
}

export default function Conultations(props) {

    const [currentProf, setCurrentProf] = useState(0)

    const switchProf = (e) => {
        setCurrentProf(e.target.value)
    }

    return(
        <div>
            <div className="select-form">
                <label className="select-form-element">Wybierz profesora</label>
                <br />
                <select className="select-form-element" name="profs" id="profs" onChange={switchProf}>
                        <option value="0" selected disabled>--Select--</option>
                    {Object.entries(profs).map((prof) => (
                        <option value={prof[1]}>{prof[0]}</option>
                    ))}
                </select>
            </div>

            <div className="schedule-view">
                {!schedules[currentProf] && (<p>Nothing to see here B)</p>)}
                {schedules[currentProf] && Object.entries(schedules[currentProf]).map((day) => (
                    <div>
                        <h3>{day[0]}</h3>
                        {Object.entries(schedules[currentProf][day[0]]).map((hour) => (
                            <div style={{marginLeft: "40px"}}>
                                <h4>{hour[0]}</h4>
                                <div style={{marginLeft: "20px"}}>
                                    <p>name: {schedules[currentProf][day[0]][hour[0]].name}</p>
                                    <p>type: {schedules[currentProf][day[0]][hour[0]].type}</p>
                                    <p>duration (blocks): {schedules[currentProf][day[0]][hour[0]].duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}