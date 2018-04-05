import React, { Component } from 'react';

import { Panel } from 'react-bootstrap'

class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { info: props.info, status: props.status };
  }

  render() {
    let { info, status } = this.state;

    return (
      <Panel className="deviceInfo" bsStyle={status === "on" ? "success" : "danger"}>
        <Panel.Heading className="deviceInfoHeader">
          {info.name}
          {info.status}
        </Panel.Heading>
        <Panel.Body>
          No Device History Found
        </Panel.Body>
      </Panel>
     );
  }
}
 
export default DeviceInfo;