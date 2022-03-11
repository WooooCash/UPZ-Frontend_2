import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainScreen from "./screens/main/MainScreen.js";
import ConsultationsScreen from './screens/consultations/ConsultationsScreen';
import PlanScreen from './screens/plan/PlanScreen';
import Scheduletest from './components/scheduletest/Scheduletest';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/consultations" component={ConsultationsScreen} />
      <Route exact path="/planTest" component={PlanScreen} />
      <Route exact path="/schedule" component={Scheduletest} />
      <Route exact path="/" component={MainScreen}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
