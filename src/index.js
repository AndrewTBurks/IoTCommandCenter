import React from 'react';
import ReactDOM from 'react-dom';
import getPowerData from './data';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let defaultDevices = [
  { 
    info: {
      name: "Kitchen Fan",
      normalUsage: 100
    },
    status: "off"
  },
  { 
    info: {
      name: "Space Heater",
      normalUsage: 500
    },
    status: "off"
  },
  { 
    info: {
      name: "Incandescent Lamp",
      normalUsage: 300
    },
    status: "on"
  },
  { 
    info: {
      name: "Large Hadron Collider",
      normalUsage: 1000000
    },
    status: "off"
  },
  { 
    info: {
      name: "Dehumidifier",
      normalUsage: 50
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
  device => {
    let toDate = new Date();
    let fromDate = new Date();
    fromDate.setDate(toDate.getDate() -1);
    return getPowerData(
      device.info.name,
      fromDate,
      toDate,
      device.info.normalUsage
    )
  }
);

const defaultDeviceDataMap = new Map(
  defaultDeviceData.map((data) => [data.deviceName, data.powerData]
  )
);

for (let device of defaultDeviceData) {
  console.log(device);

  let deviceInd = defaultDevices.findIndex((d) => {
    return d.info.name === device.deviceName;
  });

  console.log(device.powerData[device.powerData.length - 1]);
  defaultDevices[deviceInd].status = device.powerData[device.powerData.length - 1].power === 0 ? "off" : "on";
}

ReactDOM.render(<App 
  devices={defaultDevices}
  deviceDataMap={defaultDeviceDataMap}
  spaces={defaultSpaces}
  scenes={defaultScenes}/>, document.getElementById('root'));

registerServiceWorker();
//console.log(getPowerData("Incandescent Lamp", new Date("2018-04-01"),new Date("2018-04-02")));
