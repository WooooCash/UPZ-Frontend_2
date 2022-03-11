import React, { useEffect, useState } from "react";
import "./Scheduletest.css"


/*
w Props chcemy mieć obiekt zawierający zajęcia
każde zajęcie powinno co najmniej mieć
- dzień (1-7)
- godzine (1-14)
*/
const classes = [
    {
        day: 1,
        hour: 1,
        dur: 1,
    },
    {
        day: 2,
        hour: 6,
        dur: 2,
    },
    {
        day: 4,
        hour: 10,
        dur: 1,
    },
    {
        day: 6,
        hour: 1,
        dur: 2,
    }
]

const hours = [
    "8.30 - 9.15",
    "9.15 - 10.00",
    "10.00 - 10.45",
    "11.00 - 11.45",
    "12.00 - 12.45",
    "12.45 - 13.30",
    "14.00 - 14.45",
    "14.45 - 15.30",
    "16.00 - 16.45",
    "16.45 - 17.30",
    "17.40 - 18.25",
    "18.25 - 19.10",
    "19.20 - 20.05",
    "20.05 - 20.50",
]

const days = [
    "Pon",
    "Wt",
    "Śr",
    "Czw",
    "Pt",
    "Sob",
    "Ndz",
]

export default function Scheduletest(props) {

    const height_percentage = 6.66;
    const width_percentage = 12.5;

    const test = () => {
        classes.map((c) => {
            console.log(c);
        })
    }

    return (
        <div class="container">
            <h1>Title</h1>
            {test()}
            <div class="plan">
                {days.map((d, i) => (
                    <div class="days" style={{top: '0%', left: ((i+1) * width_percentage+"%"), width: width_percentage+"%", height: height_percentage+"%"}}>
                        {d}
                    </div>
                ))}
                {hours.map((h, i) => (
                    <div class="hours" style={{top: ((i+1) * height_percentage)+"%", left: '0%', width: width_percentage+"%", height: height_percentage+"%"}}>
                        {h}
                    </div>
                ))}
                {classes.map((c) => (
                    <div class="block" style={{top: (c.hour * height_percentage)+"%", left: (c.day * width_percentage) + "%", width: width_percentage+"%", height: c.dur * height_percentage+"%"}}>

                    </div>
                ))}
            </div>
        </div>
    )
}