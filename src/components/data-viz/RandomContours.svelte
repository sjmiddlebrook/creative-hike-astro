<script lang="ts">
  import { contours as countoursD3 } from 'd3-contour';
  import { select } from 'd3-selection';
  import { range } from 'd3-array';
  import { geoPath, geoIdentity } from 'd3-geo';
  import { onMount } from 'svelte';

  function debounce(func: Function, wait: number) {
    let timeout: number;
    return function (...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      // @ts-ignore error
      timeout = setTimeout(later, wait);
    };
  }

  function updateSvg(width: number, height: number) {
    // scale n with the size of the window 50 on small windows, then progressively more
    const n = Math.max(50, Math.floor(Math.min(width, height) / 10));
    const values = new Array(n * n).fill(0).map(() => Math.random());

    // Create the contour generator
    const contours = countoursD3()
      .size([n, n])
      .thresholds(range(0, 1, 0.1));

    // Generate contour data
    const contourData = contours(values);
    const scale = Math.max(width, height) / n;
    const projection = geoIdentity().scale(scale).translate([0, 0]);

    const svg = select('svg').attr('width', width).attr('height', height);

    const paths = svg.selectAll('path').data(contourData);

    // Enter new paths
    paths
      .enter()
      .append('path')
      // @ts-ignore error
      .merge(paths)
      .attr('d', geoPath(projection))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue');

    // Remove old paths
    paths.exit().remove();
  }

  let width = 0;
  let height = 0;

  onMount(() => {
    updateSvg(width, height);
  });

  const debouncedUpdateSvg = debounce(() => updateSvg(width, height), 100);
</script>

<svelte:window
  bind:innerWidth={width}
  bind:innerHeight={height}
  on:resize={debouncedUpdateSvg}
/>
<svg class="absolute left-0 top-0" {width} {height} />
