export function lerp({
  x,
  xMin,
  xMax,
  yMin = 0,
  yMax = 1,
}: {
  x: number;
  xMin: number;
  xMax: number;
  yMin?: number;
  yMax?: number;
}) {
  const ySpread = yMax - yMin;
  const xRatio = (x - xMin) / (xMax - xMin);
  const y = xRatio * ySpread + yMin;
  return y;
}

export function lerpColor({
  value,
  min,
  max,
  colorStart,
  colorEnd,
}:{
  value: number,
  min: number,
  max: number,
  colorStart: [number, number, number],
  colorEnd: [number, number, number]
}) {
  const ratio = (value - min) / (max - min);

  const r = Math.round(colorStart[0] + ratio * (colorEnd[0] - colorStart[0]));
  const g = Math.round(colorStart[1] + ratio * (colorEnd[1] - colorStart[1]));
  const b = Math.round(colorStart[2] + ratio * (colorEnd[2] - colorStart[2]));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function generateTimes() {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i === 0 || i === 12 ? 12 : i % 12;
    const amOrPM = i < 12 ? 'AM' : 'PM';
    times.push(`${hour} ${amOrPM}`);
  }
  return times;
}

function getHourlyWeight(hour: number) {
  if (hour < 2) {
    return 1.5;
  }
  if (hour < 8) {
    return 1;
  }
  if (hour < 11) {
    return 1.25;
  }
  if (hour < 13) {
    return 3;
  }
  if (hour < 17) {
    return 2;
  }
  if (hour === 22) {
    return 1.75;
  }
  if (hour === 23) {
    return 1.25;
  }
  return 1;
}

export const randomData = generateRandomData();

export function generateRandomData({
  min = 0,
  max = 100,
}: {
  min?: number;
  max?: number;
} = {}) {
  const data = [];
  let weightedMax = 0;
  for (let hour = 0; hour < 24; hour++) {
    const hourlyWeight = getHourlyWeight(hour);
    if (hourlyWeight * max > weightedMax) {
      weightedMax = hourlyWeight * max;
    }
    const dataForHour = [];
    for (let day = 0; day < 7; day++) {
      let randomNum = Math.random();
      if (hourlyWeight > 1) {
        // only allow random values above .5
        randomNum = Math.random() * 0.5 + 0.5;
      }
      const randomVal = Math.floor(randomNum * 100 * hourlyWeight);
      dataForHour.push(randomVal);
    }
    data.push(dataForHour);
  }
  const weekHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hourHeaders = generateTimes();
  return {
    data,
    min,
    max: weightedMax,
    weekHeaders,
    hourHeaders,
  };
}
