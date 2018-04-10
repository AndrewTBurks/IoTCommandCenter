import React from 'react';
import ReactDOM from 'react-dom';
import getPowerData from './data';

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
    status: "off"
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

// let defaultSpaces = [
//   "Living Room",
//   "Kitchen",
//   "Bedroom",
//   "Outdoors"
// ];

// let defaultScenes = [
//   "At Work",
//   "Good Morning",
//   "Bed Time",
//   "Party!"
// ];

let defaultSpaces = [
    {
      name: "Living Room",
        devices: [
            "Space Heater",
            "Incandescent Lamp"
        ]
    },
    {
      name: "Kitchen",
        devices: [
            "Kitchen Fan",
            "Incandescent Lamp"
        ]
    },
    {
      name: "Bedroom",
        devices: [
            "Incandescent Lamp"
        ]
    },
    {
      name: "Outdoors",
        devices: [
            "Incandescent Lamp"
        ]
    }
];

let defaultScenes = [
    {
        name: "At Work",
        activationStatus: "inactive",
        devices: [
            {deviceName: "Space Heater", deviceSceneStatus: "on"},
            {deviceName: "Incandescent Lamp", deviceSceneStatus: "on"}
        ]
    },
    {
        name: "Good Morning",
        activationStatus: "active",
        devices: [
            {deviceName: "Dehumidifier", deviceSceneStatus: "off"},
            {deviceName: "Space Heater", deviceSceneStatus: "on"}
        ]
    },
    {
        name: "Bed Time",
        activationStatus: "inactive",
        devices: [
            {deviceName: "Incandescent Lamp", deviceSceneStatus: "off"},
            {deviceName: "Space Heater", deviceSceneStatus: "on"}
        ]
    },
    {
        name: "Party!",
        activationStatus: "inactive",
        devices: [
            {deviceName: "Incandescent Lamp", deviceSceneStatus: "on"}
        ]
    }
];

const defaultDeviceData = defaultDevices.map(
  device =>{
    let toDate = new Date();
    let fromDate = new Date();
    fromDate.setDate(toDate.getDate() -1);
    return getPowerData(
      device.info.name,
      fromDate,
      toDate
    )
  }
);

const defaultDeviceDataMap = new Map(
  defaultDeviceData.map((data) => [data.deviceName, data.powerData]
  )
);

ReactDOM.render(<App 
  devices={defaultDevices}
  deviceDataMap={defaultDeviceDataMap}
  spaces={defaultSpaces}
  scenes={defaultScenes}/>, document.getElementById('root'));

registerServiceWorker();
//console.log(getPowerData("Incandescent Lamp", new Date("2018-04-01"),new Date("2018-04-02")));
