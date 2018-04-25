import React, { Component } from 'react';
import {XYPlot, LineMarkSeries, XAxis, YAxis} from 'react-vis';

class DeviceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      width: props.width
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // just overwrite old state completely with new props
    return { data: nextProps.data, width: nextProps.width };
  }

  render() {
    let {data, width} = this.state;
    let chartData = data.map(dataPoint=> {
      return {
        x: new Date(dataPoint.timestamp).getTime(),
        y: dataPoint.power
      };
    });

    return (
      <XYPlot
        width={width-5}
        height={170}>
        <LineMarkSeries data={chartData}/>
        {/* <XAxis title="Time" /> */}
        <YAxis title="Usage (W)"/>
      </XYPlot>
    );
  }
}

export default DeviceChart;