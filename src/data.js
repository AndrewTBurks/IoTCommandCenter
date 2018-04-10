export default function getPowerData(deviceName, fromDate, toDate, normalValue) {
  let fromEpoch = fromDate.getTime();
  let toEpoch = toDate.getTime();
  let powerData = [];
  let fluctuation = normalValue * 0.15; // 5% fluctuation

  while(fromEpoch < toEpoch) {
    powerData.push({ timestamp: new Date(fromEpoch).toISOString(), power: calculateCurrentPower(normalValue, fluctuation, powerData[powerData.length-1]) });
    fromEpoch = fromEpoch + 3600000;
  }
  return { deviceName: deviceName, powerData: powerData}
}

function calculateCurrentPower(avg, fluctuation, lastValue) {
  let isOff;

  // make it more likely to keep the same state
  if (lastValue) {
    let keepState = Math.random() < 0.85;

    if ((keepState && lastValue.power === 0) ||
      (!keepState && lastValue.power !== 0)) {
      return 0;
    }
  } else {
    let isOff = Math.random() < 0.50;

    if (isOff) {
      return 0;
    }
  }

  return (Math.random() * fluctuation) - (fluctuation / 2) + avg; 
}

