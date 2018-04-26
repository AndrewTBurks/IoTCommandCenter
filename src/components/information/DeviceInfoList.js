import React, { Component } from 'react';

import { Form, FormGroup, InputGroup, FormControl, ControlLabel, Glyphicon} from 'react-bootstrap';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

import DeviceInfo from './DeviceInfo'

class DeviceInfoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices,
      data: props.data,
      order: "nameA"
    };

    let avg = (data) => {
      return data.reduce((a, b) => a + b) / data.length
    };

    this.sortBy = {
      "nameA": (a, b) => a.info.name.localeCompare(b.info.name),
      "nameZ": (a, b) => b.info.name.localeCompare(a.info.name),
      "powerA": (a, b) => {
        let aData = this.state.data.get(a.info.name).map(x => x.power).filter(val => val !== 0);
        let bData = this.state.data.get(b.info.name).map(x => x.power).filter(val => val !== 0);
        if (!aData.length) return -1;
        if (!bData.length) return 1;
        return avg(aData) - avg(bData);
      },
      "powerD": (a, b) => {
        let aData = this.state.data.get(a.info.name).map(x => x.power).filter(val => val !== 0);
        let bData = this.state.data.get(b.info.name).map(x => x.power).filter(val => val !== 0);
        if (!aData.length) return 1;
        if (!bData.length) return -1;
        return avg(bData) - avg(aData);
      }
    }

    this.sortChanged = this.sortChanged.bind(this);
  }

  sortChanged(e) {
    this.setState({order: e.target.value});
  }

  render() {
    let { devices, data } = this.state;
    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", maxHeight: "100%" }}>
        <div className="listHeader" style={{ textAlign: "right", marginBottom: "10px", padding: "0 5px" }}>
          <Form inline>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Sort By: </ControlLabel> <InputGroup>
                <InputGroup.Addon>
                  <Glyphicon glyph="sort" />{" "}
                </InputGroup.Addon>
                <FormControl componentClass="select" placeholder="Sort By:" onChange={this.sortChanged}>
                  <option value="nameA">Name A-Z</option>
                  <option value="nameZ">Name Z-A</option>
                  <option value="powerA">Power Asc</option>
                  <option value="powerD">Power Desc</option>
                </FormControl>
              </InputGroup>
            </FormGroup>
          </Form>
        </div>
        <div style={{ width: "98%", display: "flex", flex: "1", flexDirection: "column", overflowY: "scroll" }}>
          {devices.map(d => (d)).sort(this.sortBy[this.state.order]).map((device, i) => (
            <DeviceInfo
              key={i}
              info={device.info}
              status={device.status}
              data={data.get(device.info.name)}
            />
          ))}
        </div>
      </div>;
  }
}
 
export default DeviceInfoList;