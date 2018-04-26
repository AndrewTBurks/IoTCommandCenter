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
                  {this.props.isScene ? (sceneActivationStatus(item, this.props.devices)) ? (<Glyphicon glyph="record" className="sceneActive"/>) : (<Glyphicon glyph="record" className="sceneInactive"/>) : ""}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}

function sceneActivationStatus(scene, allDevices){
    var isActive = [];
    var sceneDevices = scene.devices;
    console.log(sceneDevices, allDevices);

    sceneDevices.forEach(function(d){
        allDevices.forEach(function(ad){
            if(d.deviceName == ad.info.name){
                if(d.deviceSceneStatus == ad.status)
                {
                    isActive.push(true);
                    // return;
                }
                else {
                    isActive.push(false);
                }
            }
        });
    });

   return !isActive.includes(false);
}
 
export default AppendableList;