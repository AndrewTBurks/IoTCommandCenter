import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel,
  Glyphicon, Button, ButtonGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

class AddSceneSelectedDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices.map(d => ({
        deviceName: d.info.name,
        deviceSceneStatus: "off"
      })),
      inputVal: ""
    };

    this.updateDeviceSelectedStatus = this.updateDeviceSelectedStatus.bind(this);
    this.onSaveScene = this.onSaveScene.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // keep only devices which also exist in the nextProps
    let existingDevices = prevState.devices.filter(
      d => nextProps.devices.findIndex(d2 => d.deviceName === d2.info.name) !== -1
    );

    // see which deviecs are new to map to state data structure
    let newDevices = nextProps.devices.filter(
      d => prevState.devices.findIndex(d2 => d2.deviceName === d.info.name) === -1
    );

    // return concatenation of both
    return {
      devices: existingDevices.concat(
        newDevices.map(d => ({
          deviceName: d.info.name,
          deviceSceneStatus: "off"
        }))
      )
    };
  }

  updateDeviceSelectedStatus(device, newStatus) {
    device.deviceSceneStatus = newStatus;
    
    this.setState({ devices: this.state.devices });
  }

  onSaveScene() {
    let scene = {
      name: this.state.inputVal,
      devices: this.state.devices
    };

    this.props.onsave(scene);
  }

  render() {
    let _this = this;

    return (
      <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <div className="listHeader" style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "flex-start"}}>
          <div className="listTitle" style={{}}>New Scene</div>

          <div style={{}}>
            <Form inline>
              <FormGroup>
                <ControlLabel>Name:</ControlLabel>{" "}
                <FormControl
                  type="text"
                  placeholder="Enter the scene Name"
                  style={{marginRight: "10px"}}
                  onChange={function(event) { _this.setState({inputVal: event.target.value}); }}
                />
                <Button
                  bsStyle="danger"
                  style={{ 
                    float: "right",
                    margin: "0 3px"
                  }}
                  onClick={() => { this.props.oncancel(); }}
                >Cancel</Button>
                <Button
                  disabled={!(this.state.inputVal.length && this.state.devices.length)}
                  bsStyle="success"
                  style={{
                    float: "right",
                    margin: "0 3px"
                  }}
                  onClick={this.onSaveScene}
                >Save</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
        <div style={{display: "flex", flex: "1", overflowY: "scroll", flexDirection: "column"}}>
          <ListGroup>
            {this.state.devices.map((d, i) => (
              <ListGroupItem key={i}>
                {d.deviceName}
                <Button
                  bsStyle="danger"
                  bsSize="xsmall"
                  style={{ 
                    float: "right",
                    marginLeft: "15px"
                  }}
                  onClick={() => {
                    this.props.onremove(d.deviceName);
                  }}
                >
                  <Glyphicon glyph="remove" />
                </Button>
                <ButtonGroup style={{ float: "right" }}>
                  <Button bsSize="xsmall" bsStyle={d.deviceSceneStatus === "off" ? "danger" : "default"} onClick={() => { this.updateDeviceSelectedStatus(d, "off"); }}>Off</Button>
                  <Button bsSize="xsmall" bsStyle={d.deviceSceneStatus === "on" ? "success" : "default"} onClick={() => { this.updateDeviceSelectedStatus(d, "on"); }}>On</Button>
                </ButtonGroup>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}
 
export default AddSceneSelectedDevices;