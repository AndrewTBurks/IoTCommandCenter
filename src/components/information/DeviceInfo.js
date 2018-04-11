import React, { Component } from 'react';
import { Panel , Row , Col, Label } from 'react-bootstrap'
import DeviceChart from "./DeviceChart";
import AddScenePanel from '../control-automation/AddScenePanel'
 
class DeviceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { info: props.info, status: props.status, data: props.data };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // just overwrite old state completely with new props
    return { info: nextProps.info, status: nextProps.status };
  }

  render() {
    let { info, status, data } = this.state;
    let powerValues = data.map(x => x.power).filter(val => val !== 0);
    let max = Math.max(...powerValues);
    let min = Math.min(...powerValues);
    let avg = (powerValues.reduce((a, b)=>a+b)/powerValues.length);
    return (
      <Panel className="deviceInfo" bsStyle={status === "on" ? "success" : "danger"}>
        <Panel.Heading className="deviceInfoHeader">
          {info.name}
          <Label className="deviceInfoUsageLabel"
            bsStyle={status === "on" ? "success" : "danger"}
              style={{
                display: "inline-block",
                float: "right",
                fontSize: "12px",
                fontWeight: "bold"}}>
            <span style={{margin: "0 5px"}}>
              {status.toUpperCase()}
            </span>
            <span style={{margin: "0 5px"}}>
              {data[data.length - 1].power.toFixed(2)} W
            </span>
          </Label>
        </Panel.Heading>
        <Panel.Body>
          <Row style={{height: "175px"}}> 
            <Col md={3} style={{height:"100%", padding:"8px"}}>
              <div style={{border: "1px solid #aaa", height:"100%", padding:"5px"}}>
                <p style={{padding: "5px"}}>Max: {max.toFixed(2)} W</p>
                <p style={{padding: "5px"}}>Avg: {avg.toFixed(2)} W</p>
                <p style={{padding: "5px"}}>Min: {min.toFixed(2)} W</p>
              </div>
            </Col>
             
            <Col md={9} style={{height:"100%", padding:"8px"}}>
              <div style={{border: "1px solid #aaa", height:"100%", padding:"5px"}}>
                <DeviceChart data={data}/>
              </div>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
     );
  }
}
 
export default DeviceInfo;