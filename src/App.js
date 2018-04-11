import React, { Component } from 'react';
import './App.css';
import "../node_modules/react-vis/dist/style.css";

import {
  Grid, Row, Col,
  Navbar,
  Button,
  Glyphicon,
  Modal
} from 'react-bootstrap';

import UIPanel from './components/UIPanel';
import DeviceInfoList from './components/information/DeviceInfoList';
import AddScenePanel from './components/control-automation/AddScenePanel';
import ControlAutomationPanel from './components/control-automation/ControlAutomationPanel';
import DeviceInformationPanel from './components/information/DeviceInformationPanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: props.devices,
      deviceDataMap: props.deviceDataMap,
      spaces: props.spaces,
      scenes: props.scenes,
      componentDevices: props.devices,
      componentName: 'All',
      isScene: null,
      modalState: false,

      creatingScene: false
    };

    this.onAddScene = this.onAddScene.bind(this);
    this.onSaveNewScene = this.onSaveNewScene.bind(this);
    this.onCancelSceneCreation = this.onCancelSceneCreation.bind(this);
  }

  onAddScene() {
    this.setState({ creatingScene: true });
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
    let { devices, deviceDataMap, spaces, scenes, componentDevices, componentName, isScene, modalState } = this.state;
    let _this = this; // alias this

    //property for devicelist
    let devicesListProps = {
      componentDevices: componentDevices,
      componentName: componentName,
      isScene: isScene,
      deviceChangeStatus: deviceChangeStatus,
      sceneDevicesChangeStatus: sceneDevicesChangeStatus,
      onAddScene: this.onAddScene
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
            <Button bsStyle="info" disabled>
              <Glyphicon glyph="user" style={{ marginRight: "5px" }} />
              Users
            </Button>
            <Button bsStyle="danger" disabled>Log Out</Button>
          </Navbar.Form>
        </Navbar>

        <Row className="content">

          <Col md={6} className="mainPanel">
            {
              this.state.creatingScene ?
                (
                  <AddScenePanel devices={devices} onsave={this.onSaveNewScene} oncancel={this.onCancelSceneCreation} />
                ) :
                (
                  <ControlAutomationPanel spaces={spaces} scenes={scenes} onItemSelection={onItemSelection} devicesListProps={devicesListProps} />
                )
            }
          </Col>
          <Col md={6} className="mainPanel">
            <DeviceInformationPanel devices={devices} deviceDataMap={deviceDataMap}/>
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

      newDevices.forEach(function (d) {
        sceneDevices.forEach(function (sd) {
          if (d.info.name === sd.info.name) {
            d.status = sd.deviceSceneStatus;
          }
        });
      });

      _this.setState({ devices: newDevices, modalState: true, scenes: newScenes });
    }//sceneDevicesChangeStatus()

    // componentName defines what is selected (Scene or Space)
    function onItemSelection(componentName, itemSelected) {
      let newComponentDevices, isScene;

      console.log("onItemSelection", arguments);

      if (componentName === 'Scenes') {
        isScene = true;
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

      _this.setState({ componentDevices: newComponentDevices, componentName: componentName, isScene: isScene });
    }//onItemSelection()
  }
}

export default App;
