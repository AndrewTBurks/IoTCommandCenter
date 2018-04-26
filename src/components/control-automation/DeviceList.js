import React, { Component } from 'react';

import { ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap';

import Device from './Device';

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // devices: props.devices
    };
  }

  render() {
    return (
      <div className="deviceList" style={{ height: "100%" }}>
        <div className="listHeader">
          {
            this.props.isScene ? (
              !this.props.devices.find((device) => device.status !== device.deviceSceneStatus) ?
                (<Button bsStyle="success" className="activateScene" disabled>Active</Button>) :
                (<Button bsStyle="success" className="activateScene" onClick={() => { this.props.onSceneActivation(this.props.devices, this.props.componentName); }}>Activate Scene</Button>)
            ) : (
                ""
              )
          }
          <div className="listTitle">
            {this.props.componentName === 'All' ? (
              <React.Fragment>Devices: All</React.Fragment>
            ) : (
              <React.Fragment>
              Devices&nbsp;
                <Label bsStyle="info">
                  {this.props.componentName}&nbsp;
                  <a><i className="remove glyphicon glyphicon-remove-circle glyphicon-white" onClick={this.props.showAll}></i></a>
                </Label>
              </React.Fragment>
            )}
          </div>

        </div>
        <div className="containerDiv">
          <div className="info">Current Status</div>
          {
            this.props.isScene ? (
              <div className="sceneInfo">Status on Activation</div>
            ) : ("")
          }
        </div>
        <div style={{ overflowY: "scroll", maxHeight: "80%" }}>
          <ListGroup>
            {
              this.props.devices.map((d, i) => (
                <ListGroupItem key={i}>
                  <Device info={d.info} status={d.status} deviceSceneStatus={d.deviceSceneStatus} isScene={this.props.isScene} onStatusChange={this.props.onStatusChange} />
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default DeviceList;