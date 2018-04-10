import React, { Component } from 'react';

import UIPanel from '../UIPanel';
import AppendableList from './AppendableList';
import DeviceList from './DeviceList';
import { Row, Col } from 'react-bootstrap';

class ControlAutomationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: props.spaces, 
      scenes: props.scenes, 
      devicesListProps: props.devicesListProps,
    };
  }


  render() {
    let { spaces, scenes, devicesListProps } = this.state;

    return (
        <UIPanel title="Device Control and Automation" description="Use this section to set up and control basic device automation">
        <Row style={{ height: "50%" }}>
          <Col md={6} className="spacesList">
            <AppendableList name="Spaces" items={spaces} itemSelected={this.props.onItemSelection}/>
          </Col>
          <Col md={6} className="scenesList">
            <AppendableList name="Scenes" items={scenes} itemSelected={this.props.onItemSelection}/>
          </Col>
        </Row>
        <Row style={{ height: "50%" }}>
          <Col md={12}>
            <DeviceList devices={devicesListProps.componentDevices} componentName={devicesListProps.componentName} isScene={devicesListProps.isScene} activationStatus={devicesListProps.activationStatus} onStatusChange={devicesListProps.deviceChangeStatus}
            onSceneActivation={devicesListProps.sceneDevicesChangeStatus}/>
          </Col>
        </Row>
      </UIPanel>
    );
  }
}
 
export default ControlAutomationPanel;