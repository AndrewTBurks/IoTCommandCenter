import React, { Component } from 'react';

import UIPanel from '../UIPanel';
import DeviceInfoList from './DeviceInfoList';
import { Row, Col } from 'react-bootstrap';

class DeviceInformationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices,
      deviceDataMap: props.deviceDataMap,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      devices: nextProps.devices,
      deviceDataMap: nextProps.deviceDataMap,
    };
  }


  render() {
    let { devices, deviceDataMap } = this.state;

    return (
      <UIPanel title="Device Information" descriqption="Use this section to explore device information and statistics">
        <DeviceInfoList devices={devices} data={deviceDataMap} />
      </UIPanel>
    );
  }
}

export default DeviceInformationPanel;