import React, { Component } from 'react';

import { ButtonGroup, Button } from 'react-bootstrap';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = { info: props.info, status: props.status, isScene: props.isScene, deviceSceneStatus: props.deviceSceneStatus };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // just overwrite old state completely with new props
    return { info: nextProps.info, status: nextProps.status, isScene: nextProps.isScene, deviceSceneStatus: nextProps.deviceSceneStatus };
  }

  render() {
    let {info, status, isScene, deviceSceneStatus} = this.state;

    return ( 
      <div className="device">
        <ButtonGroup>
          <Button bsSize="small" bsStyle={status === "off" ? "danger" : "default"} onClick={() => { this.props.onStatusChange(info.name, "off"); }}>Off</Button>
          <Button bsSize="small" bsStyle={status === "on" ? "success" : "default"} onClick={() => { this.props.onStatusChange(info.name, "on"); }}>On</Button>
        </ButtonGroup>
        <span className="deviceName">
          { info.name }
        </span>
          {
              isScene ? (
                  deviceSceneStatus === 'on' ?
                      ( <label className="labels" style={{border: 2 + 'px solid #69a85c', color: '#69a85c'}}>{deviceSceneStatus}</label> ) :
                      ( <label className="labels" style={{border: 2 + 'px solid #cc5047', color: '#cc5047'}}>{deviceSceneStatus}</label>)
              ) : (
                  <label>{""}</label>
              )

          }
      </div>
    );
  }
}

export default Device;