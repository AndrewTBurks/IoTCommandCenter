import React, { Component } from 'react';
import {FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis} from 'react-vis';

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
      <FlexibleWidthXYPlot
        // width={width-5}
        height={170}
        xType="time"
        >
        <LineMarkSeries data={chartData}/>
        {/* <XAxis title="Time" /> */}
        <XAxis bottom={10} title="Time"/>
        <YAxis title="Usage (W)"/>
      </FlexibleWidthXYPlot>
    );
  }
}

export default DeviceChart;