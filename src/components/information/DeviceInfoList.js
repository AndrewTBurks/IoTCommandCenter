import React, { Component } from 'react';
import DeviceInfo from './DeviceInfo'

class DeviceInfoList extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: props.devices };
  }
  render() {
    let { devices } = this.state;

    return (
      <div>
        {
          devices.map(device => (
            <DeviceInfo info={device.info} status={device.status}/>
          ))
        }
      </div>
    );
  }
}
 
export default DeviceInfoList;