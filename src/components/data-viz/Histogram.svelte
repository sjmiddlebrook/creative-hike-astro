<script lang="ts">
  import { lerp, generateRandomData } from '@utils/data-viz/data';
  export let randomData = generateRandomData();
  export let category: 'hour' | 'day' = 'day';
  const isDay = category === 'day';
  const { data, weekHeaders, hourHeaders } = randomData;
  const dayTotals = Array(7).fill(0);
  const hourlyTotals = [];
  for (const hourly of data) {
    let hourTotal = 0;
    for (const [idx, value] of hourly.entries()) {
      dayTotals[idx] += value;
      hourTotal += value;
    }
    hourlyTotals.push(hourTotal);
  }
  const histData = isDay ? dayTotals : hourlyTotals;
  const intervals = isDay ? weekHeaders : hourHeaders;

  function getSize(value: number) {
    const size = lerp({
      x: value,
      xMin: 0,
      xMax: Math.max(...histData),
      yMin: 0,
      yMax: 200,
    });
    return `${size}px`;
  }
</script>

<div class="max-w-xl">
  {#if isDay}
    <div class="flex items-end space-x-1">
      {#each histData as value}
        <div class="w-12 bg-teal-400" style="height: {getSize(value)}" />
      {/each}
    </div>
    <div class="flex space-x-1">
      {#each intervals as interval}
        <div class="w-12 text-center">{interval}</div>
      {/each}
    </div>
  {:else}
    <div class="container">
      {#each histData as value, idx}
        <div class="flex items-center">{hourHeaders[idx]}</div>
        <div class="h-12 bg-teal-400" style="width: {getSize(value)}" />
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-gap: 0.125rem;
  }
</style>
