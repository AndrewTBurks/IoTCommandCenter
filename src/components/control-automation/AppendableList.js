import React, { Component } from 'react';

import { ListGroup, ListGroupItem , Button , Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';

class AppendableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: props.items, 
      name: props.name,
      tooltip: props.tooltip
    };
  }


  render() {
    let { items, name, tooltip } = this.state;

    const tooltipComponent = (
      <Tooltip id="tooltip">
        {tooltip}
      </Tooltip>
    );

    return (
      <div className="appendableList" style={{height: "100%"}}>
        <div className="listHeader">
            <OverlayTrigger placement="top" overlay={tooltipComponent}>
              <div className="listTitle">{name} {tooltip ? (<Glyphicon glyph="info-sign" />) : ''}</div>
            </OverlayTrigger>
          <Button 
            bsSize="xsmall" 
            bsStyle="success"
            disabled={ this.props.onadd ? false : true }
            onClick={ () => { this.props.onadd(); } }>
            <Glyphicon glyph="plus"/>
            Add
          </Button>
        </div>
        <div style={{overflowY: "scroll", maxHeight: "80%"}}>        
          <ListGroup>
            {
              items.map((item, i) => (
                <ListGroupItem key={i} className="listSelectable" onClick={() => {this.props.itemSelected(name,item)}}>
                  {item.name}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}
 
export default AppendableList;