import React, { Component } from 'react';

import { ListGroup, ListGroupItem , Button , Glyphicon} from 'react-bootstrap';

class AppendableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: props.items, 
      name: props.name 
    };
  }

  render() {
    let { items, name } = this.state;
    console.log(this.state);

    return (
      <div className="appendableList">
        <div className="listHeader">
          <div className="listTitle">{name}</div>
          <Button bsSize="xsmall" bsStyle="success">
            <Glyphicon glyph="plus"/>
            Add
          </Button>
        </div>
        <ListGroup>
          {
            items.map(item => (
              <ListGroupItem>
                {item}
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </div>
    );
  }
}
 
export default AppendableList;