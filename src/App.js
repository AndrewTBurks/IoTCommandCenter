import React, { Component } from 'react';
import './App.css';
//import "./node_modules/react-vis/dist/style.css";

import {
  Grid, Row, Col,
  Navbar,
  Button,
  Glyphicon,
  Modal
} from 'react-bootstrap';

import UIPanel from './components/UIPanel';
import DeviceList from './components/control-automation/DeviceList';
import AppendableList from './components/control-automation/AppendableList';

import DeviceInfoList from './components/information/DeviceInfoList';
import AddScenePanel from './components/control-automation/AddScenePanel';
import ControlAutomationPanel from './components/control-automation/ControlAutomationPanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: props.devices,
      spaces: props.spaces,
      scenes: props.scenes,
      componentDevices: props.devices,
      componentName: 'All',
      isScene: null,
      activationStatus: null,
      modalState: false,

      creatingScene: true
    };

    this.onAddScene = this.onAddScene.bind(this);
    this.onSaveNewScene = this.onSaveNewScene.bind(this);
    this.onCancelSceneCreation = this.onCancelSceneCreation.bind(this);
  }

  onAddScene() {
    this.setState({creatingScene: true});
  }

  onSaveNewScene(sceneInfo) {
    console.log(sceneInfo);

    this.state.scenes.push(sceneInfo);

    console.log(this.state.scenes);

    this.setState({
      scenes: this.state.scenes,
      creatingScene: false
    });
  }

  onCancelSceneCreation() {
    this.setState({ creatingScene: false });
  }


  render() {
    let { devices, spaces, scenes, componentDevices, componentName, isScene, activationStatus, modalState } = this.state;
    let _this = this; // alias this

    //property for devicelist
    let devicesListProps = {
      componentDevices: componentDevices,
      componentName: componentName,
      isScene: isScene,
      activationStatus: activationStatus,
      deviceChangeStatus: deviceChangeStatus,
      sceneDevicesChangeStatus: sceneDevicesChangeStatus
    };


    return (
      <Grid fluid className="modal-container">
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

            <ControlAutomationPanel title="Device Control and Automation" description="Use this section to set up and control basic device automation" spaces={spaces} scenes={scenes} onItemSelection={onItemSelection} devicesListProps={devicesListProps} />
          </Col>

          <Col md={6} className="mainPanel">
            {
              this.state.creatingScene ? 
              (
                <AddScenePanel devices={devices} onsave={this.onSaveNewScene} oncancel={this.onCancelSceneCreation}/>
              ) : 
              (
                <UIPanel title="Device Information" description="Use this section to explore device information and statistics">
                  <DeviceInfoList devices={devices} />
                </UIPanel>
              )
            }
            {/* <UIPanel title="Device Information" description="Use this section to explore device information and statistics">
              <DeviceInfoList devices={devices} />
            </UIPanel> */}
            {/* <AddScenePanel devices={devices} onsave={onSaveNewScene} oncancel={onCancelSceneCreation}/> */}
          </Col>
        </Row>

        {/*scene activation success dialog*/}

        <Modal
          show={modalState}
          onHide={handleHide}
          bsSize="sm"
          dialogClassName="successModal"
        >
          <Modal.Header className="modalHeader">
            <Modal.Title>
              <Glyphicon glyph="ok" className="glyphOk" style={{ marginRight: "5px", color: "#69a85c" }} />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <span className="successMessage">Success</span>
            Scene has been successfully activated
            </Modal.Body>

          <Modal.Footer className="modalFooter">
            <Button className="modalCloseButton" onClick={handleHide}>Proceed</Button>
          </Modal.Footer>
        </Modal>


      </Grid>
    );

    function handleHide() {
      _this.setState({ modalState: false });
    }

    function deviceChangeStatus(deviceName, newStatus) {
      // console.log(deviceName, newStatus);
      let newDevices = devices;

      let deviceIndex = newDevices.findIndex((el) => el.info.name === deviceName);

      newDevices[deviceIndex].status = newStatus;

      _this.setState({ devices: newDevices });
    }

    function sceneDevicesChangeStatus(sceneDevices, sceneName) {
      let newDevices = devices;
      let newScenes = scenes;

      let sName = sceneName.substring(sceneName.indexOf(':') + 2);

      newScenes.forEach(function (s) {
        if (s.name === sName) {
          s.activationStatus = "active";
        }
      });

      newDevices.forEach(function (d) {
        sceneDevices.forEach(function (sd) {
          if (d.info.name === sd.info.name) {
            d.status = sd.deviceSceneStatus;
          }
        });
      });

      _this.setState({ devices: newDevices, activationStatus: "active", modalState: true, scenes: newScenes });
    }//sceneDevicesChangeStatus()

    // componentName defines what is selected (Scene or Space)
    function onItemSelection(componentName, itemSelected) {
      let newComponentDevices, isScene, activationStatus;

      if (componentName === 'Scenes') {
        isScene = true;
        activationStatus = itemSelected.activationStatus;
        componentName = 'Scene: ' + itemSelected.name;
        newComponentDevices = itemSelected.devices.map((object) => _this.state.devices.find((device) => device.info.name === object.deviceName));

        //add key-value pair of deviceSceneStatus (state of the device when scene will be activated)
        newComponentDevices.forEach(function (device, i) {
          device['deviceSceneStatus'] = itemSelected.devices[i].deviceSceneStatus;
        });
      }
      else {
        isScene = false;
        newComponentDevices = itemSelected.devices.map((name) => _this.state.devices.find((device) => device.info.name === name));
        componentName = 'Space: ' + itemSelected.name;
      }

      _this.setState({ componentDevices: newComponentDevices, componentName: componentName, isScene: isScene, activationStatus: activationStatus });
    }//onItemSelection()
  }
}

export default App;
