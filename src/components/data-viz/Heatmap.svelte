<script>
  import { generateRandomHeatmapData } from '@utils/data-viz/heatmaps';
  const { data, max } = generateRandomHeatmapData();
  const baseColor = '#fdba74';
</script>

<div class="grid max-w-xl grid-cols-7 gap-0.5">
  {#each data as row}
    {#each row as value}
      <div
        class="flex items-center justify-center"
        style="background-color:{baseColor}; filter: opacity({value / max});"
      >
        {value}
      </div>
    {/each}
  {/each}
</div>
