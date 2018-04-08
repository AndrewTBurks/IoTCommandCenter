import React, { Component } from 'react';
import './App.css';

import {
  Grid, Row, Col,
  Navbar,
  Button, 
  Glyphicon
} from 'react-bootstrap';

import UIPanel from './components/UIPanel';
import DeviceList from './components/control-automation/DeviceList';
import AppendableList from './components/control-automation/AppendableList';

import DeviceInfoList from './components/information/DeviceInfoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: props.devices,
      spaces: props.spaces,
      scenes: props.scenes,
      componentDevices:props.devices,
      componentName: 'All',
        isScene: null
    };
  }

  render() {
    let { devices, spaces, scenes, componentDevices, componentName, isScene } = this.state;
    let _this = this; // alias this

    return (
      <Grid fluid>
        <Navbar inverse fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">IoT Command Center</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Form pullRight>
            <Button bsStyle="info">
              <Glyphicon glyph="user" style={{ marginRight: "5px" }} />
              Users
            </Button>
            <Button bsStyle="danger">Log Out</Button>
          </Navbar.Form>
        </Navbar>
        <Row className="content">
          <Col md={6} className="mainPanel">
            <UIPanel title="Device Control and Automation" description="Use this section to set up and control basic device automation">
              <Row style={{ height: "50%" }}>
                <Col md={6} className="spacesList">
                  <AppendableList name="Spaces" items={spaces} itemSelected={onItemSelection}/>
                </Col>
                <Col md={6} className="scenesList">
                  <AppendableList name="Scenes" items={scenes} itemSelected={onItemSelection}/>
                </Col>
              </Row>
              <Row style={{ height: "50%" }}>
                <Col md={12}>
                  <DeviceList devices={componentDevices} componentName={componentName} isScene={isScene} onStatusChange={deviceChangeStatus}/>
                </Col>
              </Row>
            </UIPanel>
          </Col>
          <Col md={6} className="mainPanel">
            <UIPanel title="Device Information" description="Use this section to explore device information and statistics">
              <DeviceInfoList devices={devices} />
            </UIPanel>
          </Col>
        </Row>
      </Grid>
    );

    function deviceChangeStatus(deviceName, newStatus) {
      // console.log(deviceName, newStatus);
      let newDevices = devices;

      let deviceIndex = newDevices.findIndex((el) => el.info.name === deviceName);

      newDevices[deviceIndex].status = newStatus;
  
      _this.setState({devices: newDevices});
    }

    // componentName defines what is selected (Scene or Space)
    function onItemSelection(componentName, itemSelected){
      // console.log(itemSelected.devices);
      let newComponentDevices, isScene;

      if(componentName === 'Scenes'){
          isScene = true;
          componentName = 'Scene: ' + itemSelected.name;
          newComponentDevices = itemSelected.devices.map((object) => _this.state.devices.find((device) => device.info.name === object.deviceName));

          //add key-value pair of deviceSceneStatus (state of the device when scene will be activated)
          newComponentDevices.forEach(function(device, i){
              device['deviceSceneStatus'] = itemSelected.devices[i].deviceSceneStatus;
          });
      }
      else{
        isScene = false;
          newComponentDevices = itemSelected.devices.map((name) => _this.state.devices.find((device) => device.info.name === name));
          componentName = 'Space: ' + itemSelected.name;
      }

      _this.setState({componentDevices: newComponentDevices, componentName: componentName, isScene: isScene});
      // console.log(componentDevices);
    }//onItemSelection()


  }
}

export default App;
