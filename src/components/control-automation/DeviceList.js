import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Device from './Device';

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.state = { devices: props.devices };
  }

  render() {
    return ( 
      <div className="deviceList">
        <div className="listHeader">
          <div className="listTitle">Devices</div>
        </div>
        <ListGroup>
          {
            this.state.devices.map((d, i) => (
              <ListGroupItem key={i}>
                <Device info={d.info} status={d.status}/>
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </div>
    );
  }
}
 
export default DeviceList;