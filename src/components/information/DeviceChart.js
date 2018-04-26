import React, { Component } from 'react';
import {FlexibleXYPlot, LineMarkSeries, XAxis, YAxis} from 'react-vis';

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
      let date = new Date(dataPoint.timestamp);

      return {
        x: date,
        y: dataPoint.power
      };
    });

    return (
      <FlexibleXYPlot xType="time">
        {/* <XAxis title="Time" /> */}
        <XAxis title="Time" style={{
          line: {stroke: '#6b6b76', strokeWidth: 0.5},
          ticks: {stroke: '#6b6b76'},
          text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
        }}/>
        <YAxis title="Usage (W)" style={{
          line: {stroke: '#6b6b76', strokeWidth: 0.5},
          ticks: {stroke: '#6b6b76'},
          text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
        }}/>
        <LineMarkSeries data={chartData} size={3}/>
      </FlexibleXYPlot>
    );
  }
}

export default DeviceChart;