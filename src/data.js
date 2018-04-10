export default function getPowerData(deviceName, fromDate, toDate) {
  let fromEpoch = fromDate.getTime();
  let toEpoch = toDate.getTime();
  let powerData = [];
  while(fromEpoch < toEpoch) {
    powerData.push({ timestamp: new Date(fromEpoch).toISOString(), power: Math.random()*1000 });
    fromEpoch = fromEpoch + 3600000;
  }
  return { deviceName: deviceName, powerData: powerData}
}

