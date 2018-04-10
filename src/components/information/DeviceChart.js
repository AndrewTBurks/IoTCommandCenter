import React, { Component } from 'react';
import {XYPlot, LineMarkSeries, XAxis, YAxis} from 'react-vis';

class DeviceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {
    let {data} = this.state;
    let chartData = data.map(dataPoint=> {
      return {
        x: new Date(dataPoint.timestamp).getTime(),
        y: dataPoint.power
      };
    });
    return (
      <XYPlot
        width={500}
        height={170}>
        <LineMarkSeries data={chartData}/>
        {/* <XAxis title="Time" /> */}
        <YAxis title="Usage (W)"/>
      </XYPlot>
    );
  }
}

export default DeviceChart;