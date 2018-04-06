import React, { Component } from 'react';

import { ButtonGroup, Button } from 'react-bootstrap';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = { info: props.info, status: props.status };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // just overwrite old state completely with new props
    return { info: nextProps.info, status: nextProps.status };
  }

  render() {
    let {info, status} = this.state;

    return ( 
      <div className="device">
        <ButtonGroup>
          <Button bsSize="small" bsStyle={status === "off" ? "danger" : "default"} onClick={() => { this.props.onStatusChange(info.name, "off"); }}>Off</Button>
          <Button bsSize="small" bsStyle={status === "on" ? "success" : "default"} onClick={() => { this.props.onStatusChange(info.name, "on"); }}>On</Button>
        </ButtonGroup>
        <span className="deviceName">
          { info.name }
        </span>
      </div>
    );
  }
}

export default Device;