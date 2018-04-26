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
        <LineMarkSeries data={chartData} size={3}/>
        {/* <XAxis title="Time" /> */}
        <XAxis hideLine title="Time"/>
        <YAxis title="Usage (W)"/>
      </FlexibleXYPlot>
    );
  }
}

export default DeviceChart;