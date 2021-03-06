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
      componentName: props.devicesListProps.componentName
    };

  }
  
  static getDerivedStateFromProps(newProps, prevState) {
    return {
      spaces: newProps.spaces, 
      scenes: newProps.scenes, 
      devicesListProps: newProps.devicesListProps,
      componentName: newProps.devicesListProps.componentName
    };
  }

  render() {
    let { spaces, scenes, devicesListProps, componentName } = this.state;

    return (
        <UIPanel title="Device Control and Automation" description="Use this section to set up and control basic device automation">
        <Row style={{ height: "50%" }}>
          <Col xs={6} className="spacesList">
            <AppendableList name="Spaces" tooltip="Rooms in a house" items={spaces} isScene={false} itemSelected={this.props.onItemSelection}/>
          </Col>
          <Col xs={6} className="scenesList">
            <AppendableList name="Scenes" tooltip="Configuration of devices" items={scenes} itemSelected={this.props.onItemSelection} devices={this.props.devices} isScene={true} onadd={this.state.devicesListProps.onAddScene}/>
          </Col>
        </Row>
        <Row style={{ height: "50%" }}>
          <Col xs={12} style={{ height: "100%" }}>
            <DeviceList
              devices={devicesListProps.componentDevices}
              componentName={componentName}
              isScene={devicesListProps.isScene}
              onStatusChange={devicesListProps.deviceChangeStatus}
              onSceneActivation={devicesListProps.sceneDevicesChangeStatus}
              showAll={this.props.onShowAll}/>
          </Col>
        </Row>
      </UIPanel>
    );
  }

}
 
export default ControlAutomationPanel;