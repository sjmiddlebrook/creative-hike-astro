<script lang="ts">
  import {
    generateRandomData,
    lerp,
  } from '@utils/data-viz/data';
  export let randomData = generateRandomData();

  const {
    data,
    min,
    max,
    weekHeaders,
    hourHeaders,
  } = randomData;

  function getHeatmapColor(value: number) {
    const alpha = lerp({
      x: value,
      xMin: min,
      xMax: max,
      yMin: 0.2,
      yMax: 1,
    });
    return `rgba(253, 186, 116, ${alpha})`;
  }
</script>

<div class="container max-w-xl">
  {#each data as row, rowIdx}
    {#if rowIdx === 0}
      <div />
      {#each weekHeaders as colHeader}
        <div class="flex items-center justify-center">{colHeader}</div>
      {/each}
    {/if}
    <div>{hourHeaders[rowIdx]}</div>
    {#each row as value}
      <div
        class="flex items-center justify-center"
        style="background-color: {getHeatmapColor(value)};"
      >
        {value}
      </div>
    {/each}
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(8, minmax(40px, 1fr));
    grid-gap: 0.125rem;
  }
</style>
