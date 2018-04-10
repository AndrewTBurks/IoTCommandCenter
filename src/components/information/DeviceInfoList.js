import React, { Component } from 'react';
import DeviceInfo from './DeviceInfo'

class DeviceInfoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices,
      data: props.data
    };
  }

  render() {
    let { devices, data } = this.state;
    return (
      <div style={{overflowY: "scroll", maxHeight: "100%"}}>
        {
          devices.map((device, i) => (
            <DeviceInfo key={i} info={device.info} status={device.status} data={data.get(device.info.name)}/>
          ))
        }
      </div>
    );
  }
}
 
export default DeviceInfoList;