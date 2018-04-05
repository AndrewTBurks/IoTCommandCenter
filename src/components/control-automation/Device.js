import React, { Component } from 'react';

import { ButtonGroup, Button } from 'react-bootstrap';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = { info: props.info, status: props.status };
  }

  render() { 
    let {info, status} = this.state;

    return ( 
      <div className="device">
        <ButtonGroup>
          <Button bsSize="small" bsStyle={status === "off" ? "danger" : "default"}>Off</Button>
          <Button bsSize="small" bsStyle={status === "on" ? "success" : "default"}>On</Button>
        </ButtonGroup>
        <span className="deviceName">
          { info.name }
        </span>
      </div>
    );
  }
}

export default Device;