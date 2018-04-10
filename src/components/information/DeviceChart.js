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
        width={400}
        height={175}>
        <LineMarkSeries data={chartData}/>
    </XYPlot>
    );
  }
}

export default DeviceChart;