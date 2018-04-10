import React, { Component } from 'react';

import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

class AddSceneDevicePool extends Component {
  constructor(props) {
    super(props);
    this.state = {  }

    console.log(props);
  }
  render() { 

    return <div>
        <div className="listHeader">
          <div className="listTitle">Available</div>
        </div>
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
      </div>;
  }
}
 
export default AddSceneDevicePool;