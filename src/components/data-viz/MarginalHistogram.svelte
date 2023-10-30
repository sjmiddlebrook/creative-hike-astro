<script lang="ts">
  import { generateRandomData, lerp, lerpColor } from '@utils/data-viz/data';
  export let randomData = generateRandomData();
  const { data, min, max, weekHeaders, hourHeaders } = randomData;

  const histDataDays = Array(7).fill(0);
  const histDataHours: number[] = [];
  for (const hourly of data) {
    let hourTotal = 0;
    for (const [idx, value] of hourly.entries()) {
      histDataDays[idx] += value;
      hourTotal += value;
    }
    histDataHours.push(hourTotal);
  }

  function getSize({ value, type }: { value: number; type: 'day' | 'hour' }) {
    const isDay = type === 'day';
    const histData = isDay ? histDataDays : histDataHours;
    const yMax = isDay ? 120 : 80;
    const size = lerp({
      x: value,
      xMin: 0,
      xMax: Math.max(...histData),
      yMin: 0,
      yMax,
    });
    return `${size}px`;
  }

  function interpolateColor(value: number) {
    const midValue = min + 0.5 * (max - min);
    const colorStart: [number, number, number] = [246, 209, 159];
    const colorMid: [number, number, number] = [232, 151, 90];
    const colorEnd: [number, number, number] = [167, 101, 79];
    if (value <= midValue) {
      return lerpColor({
        value,
        min,
        max: midValue,
        colorStart,
        colorEnd: colorMid,
      });
    } else {
      return lerpColor({
        value,
        min: midValue,
        max,
        colorStart: colorMid,
        colorEnd,
      });
    }
  }
</script>

<div class="min-w-500px container max-w-2xl">
  {#each data as row, rowIdx}
    {#if rowIdx === 0}
      <div />
      {#each weekHeaders as colHeader}
        <div
          class="flex items-center justify-center text-sm font-semibold text-zinc-600"
        >
          {colHeader}
        </div>
      {/each}
      <div />
    {/if}
    <div class="text-sm font-semibold text-zinc-600">{hourHeaders[rowIdx]}</div>
    {#each row as value}
      <div
        class="flex items-center justify-center text-zinc-800"
        style="background-color: {interpolateColor(value)};"
      >
        {value}
      </div>
    {/each}
    <div class="flex">
      <div
        class="h-full shrink-0 bg-zinc-300"
        style="width: {getSize({ value: histDataHours[rowIdx], type: 'hour' })}"
      />
      <div class="pl-1 text-sm text-zinc-500">
        {new Intl.NumberFormat().format(histDataHours[rowIdx])}
      </div>
    </div>
  {/each}
  <div />
  {#each histDataDays as value}
    <div>
      <div
        class="w-full bg-zinc-300"
        style="height: {getSize({ value, type: 'day' })}"
      />
      <div class="pt-1 text-center text-sm text-zinc-500">
        {new Intl.NumberFormat().format(value)}
      </div>
    </div>
  {/each}
  <div />
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 50px repeat(8, minmax(40px, 1fr));
    grid-gap: 0.125rem;
  }
</style>
