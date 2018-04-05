import React, { Component, Fragment} from 'react';

import {
  // Row, Col,
  Panel,
  // Button, 
  Glyphicon
} from 'react-bootstrap';

class UIPanel extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Fragment>
        <Panel bsStyle="info" style={{height: "100%", boxShadow: "0 0 15px 5px rgba(31, 63, 95, 0.25)", backgroundColor: "#eee"}}>
          <Panel.Heading>
            <Panel.Title componentClass="h1"
              style={{fontSize: "20px", fontWeight: "bold"}}>
                {this.props.title}
              </Panel.Title>
          </Panel.Heading>
          <Panel.Body style={{height: "90%"}}>
            {this.props.children}
          </Panel.Body>
          <Panel.Footer style={{color: "#666"}}>
              <Glyphicon glyph="info-sign" style={{marginRight: "5px"}}/> 
              {this.props.description}
          </Panel.Footer>
        </Panel>
      </Fragment>
    );
  }
}

export default UIPanel;