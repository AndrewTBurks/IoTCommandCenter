import React, { Component } from 'react';

import { Row, Col } from 'react-bootstrap';

import UIPanel from "../UIPanel";

import AddSceneDevicePool from "./AddSceneDevicePool";
import AddSceneSelectedDevices from "./AddSceneSelectedDevices";

class AddScenePanel extends Component {
  constructor(props) {
    super(props);
    this.state = { available: props.devices.map(d => d), selected: [] }

    this.removeSelected = this.removeSelected.bind(this);
    this.selectAvailable = this.selectAvailable.bind(this);
  }

  removeSelected(deviceName) {
    console.log("Remove Selected", deviceName);

    let deviceInd = this.state.selected.findIndex(device => device.info.name === deviceName);

    if (deviceInd >= 0) {
      let device = this.state.selected.splice(deviceInd, 1)[0];

      this.state.available.push(device);

      this.setState({
        selected: this.state.selected,
        available: this.state.available
      });
    }
  }

  selectAvailable(deviceName) {
    console.log("Select Available", deviceName);

    let deviceInd = this.state.available.findIndex(device => device.info.name === deviceName);

    console.log(deviceInd);

    if (deviceInd >= 0) {
      let device = this.state.available.splice(deviceInd, 1)[0];

      this.state.selected.push(device);

      this.setState({
        selected: this.state.selected,
        available: this.state.available
      });
    }
  }

  render() {
    let { available, selected } = this.state;

    return (
      <UIPanel title="Add Scene" description="Use this section to create a new Scene">
        <Row style={{ height: "50%" }}>
          <Col md={12} className="spacesList">
            <AddSceneSelectedDevices 
              devices={selected} 
              onremove={this.removeSelected}
              oncancel={this.props.oncancel}
              onsave={this.props.onsave}/>
          </Col>
        </Row>
        <Row style={{ height: "50%" }}>
          <Col md={12}>
            <AddSceneDevicePool devices={available} onselect={this.selectAvailable}/>          
          </Col>
        </Row>
      </UIPanel>
    );
  }
}
 
export default AddScenePanel;