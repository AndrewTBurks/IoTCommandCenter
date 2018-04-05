import React, { Component } from 'react';

import { Panel , Row , Col} from 'react-bootstrap'
import DeviceInfoList from './DeviceInfoList'

class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { info: props.info, status: props.status };
  }

  render() {
    let { info, status } = this.state;

    return (
      <Panel className="deviceInfo" bsStyle={status === "on" ? "success" : "danger"}>
        <Panel.Heading className="deviceInfoHeader">
          {info.name}
          {info.status}
        </Panel.Heading>
        <Panel.Body>
          <Row style={{height: "175px"}}> 
            <Col md={3} style={{height:"100%", padding:"8px"}}>
              <div style={{border: "1px solid #aaa", height:"100%", padding:"5px"}}>
                Max:
                Avg:
                Min:
              </div>
            </Col>
             
            <Col md={9} style={{height:"100%", padding:"8px"}}>
              <div style={{border: "1px solid #aaa", height:"100%", padding:"5px"}}>
                No Device History Found
              </div>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
     );
  }
}
 
export default DeviceInfo;