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
    return { info: nextProps.info, status: nextProps.status, data: nextProps.data };
  }

  render() {
    let { info, status, data, width } = this.state;
    let powerValues = data.map(x => x.power).filter(val => val !== 0);

    let min, max, avg;

    // handle case of device off the entire time
    if (powerValues.length) {
      max = Math.max(...powerValues).toFixed(2);
      min = Math.min(...powerValues).toFixed(2);
      avg = (powerValues.reduce((a, b) => a + b) / powerValues.length).toFixed(2);
    } else {
      max = "N/A";
      min = "N/A";
      avg = "N/A";
    }

    return <Panel className="deviceInfo" bsStyle={status === "on" ? "success" : "danger"}>
        <Panel.Heading className="deviceInfoHeader">
          {info.name}
          <Label className="deviceInfoUsageLabel" bsStyle={status === "on" ? "success" : "danger"} style={{ display: "inline-block", float: "right", fontSize: "12px", fontWeight: "bold" }}>
            <span style={{ margin: "0 5px" }}>{status.toUpperCase()}</span>
            <span style={{ margin: "0 5px" }}>
              {data[data.length - 1].power.toFixed(2)} W
            </span>
          </Label>
        </Panel.Heading>
        <Panel.Body>
          <Row style={{ height: "175px" }}>
            <Col xs={3} style={{ height: "100%", padding: "8px" }}>
              <div style={{ border: "1px solid #aaa", height: "100%", padding: "5px" }}>
                <p style={{ padding: "5px" }}>Max: {max} W</p>
                <p style={{ padding: "5px" }}>Avg: {avg} W</p>
                <p style={{ padding: "5px" }}>Min: {min} W</p>
              </div>
            </Col>

            <Col xs={9} style={{ height: "100%", padding: "8px" }}>
              <div style={{ border: "1px solid #aaa", height: "100%", padding: "5px" }} ref={this.saveElem}>
                <DeviceChart data={data} width={width} />
              </div>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>;
  }
}
 
export default DeviceInfo;