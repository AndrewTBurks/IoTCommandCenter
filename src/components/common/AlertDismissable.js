import React, { Component } from 'react';

import { Alert } from 'react-bootstrap';

class AlertDismissable extends Component {
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: props.alertState,
      message: props.alertMessage
    };
  }

  handleDismiss() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }
  render() {
    let { show, message } = this.state;
    if (show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          {message}
        </Alert>
      );
    }
    return (null);
  }
}

export default AlertDismissable;