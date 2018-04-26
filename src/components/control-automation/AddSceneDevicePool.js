import React, { Component } from 'react';

import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

class AddSceneDevicePool extends Component {
  constructor(props) {
    super(props);
    this.state = {  }

    console.log(props);
  }
  render() { 

    return (
      <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <div className="listHeader">
          <div className="listTitle">Available</div>
        </div>
        <div style={{display: "flex", flex: "1", overflowY: "scroll", flexDirection: "column"}}>
          <ListGroup>
            {
              this.props.devices.map((d, i) => 
                <ListGroupItem key={i}>
                  {d.info.name}
                  <Button bsStyle="success" bsSize="xsmall" style={{float: "right"}} onClick={() => { this.props.onselect(d.info.name); }}>
                    <Glyphicon glyph="plus"/>
                    Add
                  </Button>
                </ListGroupItem>
              )
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}
 
export default AddSceneDevicePool;