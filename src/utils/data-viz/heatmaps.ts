export function generateRandomHeatmapData(
  {
    min,
    max,
  }: {
    min?: number;
    max?: number;
  } = {
    min: 0,
    max: 100,
  },
) {
  const dataByDay = [];
  for (let day = 0; day < 7; day++) {
    const dataByHour = [];
    for (let hour = 0; hour < 24; hour++) {
      const randomVal = Math.floor(Math.random() * 100);
      dataByHour.push(randomVal);
    }
    dataByDay.push(dataByHour);
  }
  return {
    data: dataByDay,
    min,
    max,
  };
}
