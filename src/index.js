import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let defaultDevices = [
  { 
    info: {
      name: "Kitchen Fan"
    },
    status: "off"
  },
  { 
    info: {
      name: "Space Heater"
    },
    status: "on"
  },
  { 
    info: {
      name: "Incandescent Lamp"
    },
    status: "on"
  },
  { 
    info: {
      name: "Large Hadron Collider"
    },
    status: "off"
  },
  { 
    info: {
      name: "Dehumidifier"
    },
    status: "off"
  }
];

let defaultSpaces = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Outdoors"
];

let defaultScenes = [
  "At Work",
  "Good Morning",
  "Bed Time",
  "Party!"
];

ReactDOM.render(<App 
  devices={defaultDevices}
  spaces={defaultSpaces}
  scenes={defaultScenes}/>, document.getElementById('root'));

registerServiceWorker();
