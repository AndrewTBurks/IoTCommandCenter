import React, { Component } from 'react';
import './App.css';

import {
  Grid, Row, Col,
  Navbar,
  Button, 
  Glyphicon
} from 'react-bootstrap';

import UIPanel from './components/UIPanel';

import DeviceList from './components/control-automation/DeviceList'
import AppendableList from './components/control-automation/AppendableList'

import DeviceInfoList from './components/information/DeviceInfoList';

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
    status: "on"
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

let defaultSpaces = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Outdoors"
];

let defaultScenes = [
  "At Work",
  "Good Morning",
  "Bed Time",
  "Party!"

];

class App extends Component {
  render() {
    return <Grid fluid>
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
                  <AppendableList name="Spaces" items={defaultSpaces} />
                </Col>
                <Col md={6} className="scenesList">
                  <AppendableList name="Scenes" items={defaultScenes} />
                </Col>
              </Row>
              <Row style={{ height: "50%" }}>
                <Col md={12}>
                  <DeviceList devices={defaultDevices} />
                </Col>
              </Row>
            </UIPanel>
          </Col>
          <Col md={6} className="mainPanel">
            <UIPanel title="Device Information" description="Use this section to explore device information and statistics">
              <DeviceInfoList devices={defaultDevices} />
            </UIPanel>
          </Col>
        </Row>
      </Grid>;
  }
}

export default App;
