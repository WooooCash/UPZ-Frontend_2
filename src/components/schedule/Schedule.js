import React, { useEffect, useState } from "react";
import "./Schedule.css"

export default function Schedule() {
    
    return(
        <div className="container">
            <h1>Rozkład</h1>
            <div className="schedule__container">
                <div className="days__container">
                    <span className="corner"></span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>
                    <span className="time">8.30 - 9.15</span>

                </div>
                <div className="part__day">
                    <div className="day">Pon</div>

                    <div className="task_schedule">Komponenty</div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task_schedule2">KCK</div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>

                </div>
                <div className="part__day">
                    <div className="day">Wt</div>

                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task_schedule2">SM</div>
                    <div className="task_schedule2">ANG</div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>

                </div>
                <div className="part__day">
                    <div className="day">Śr</div>

                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    
                </div>
                <div className="part__day">
                    <div className="day">Czw</div>

                    <div className="task_schedule2">SBD</div>
                    <div className="task_schedule2">ZTP</div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task_schedule">PZ</div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                </div>
                <div className="part__day">
                    <div className="day">Pt</div>

                    <div className="task_schedule2">VR</div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                </div>
                <div className="part__day">
                    <div className="day">Sob</div>

                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                </div>
                <div className="part__day">
                    <div className="day">Ndz</div>

                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                    <div className="task"></div>
                </div>
            </div>
        </div>
    );

}