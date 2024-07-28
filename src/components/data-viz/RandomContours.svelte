<script lang="ts">
  import {
    contours as countoursD3,
    type ContourMultiPolygon,
  } from 'd3-contour';
  import { select } from 'd3-selection';
  import { range } from 'd3-array';
  import { geoPath, geoIdentity } from 'd3-geo';

  function updateSvg(
    contourData: ContourMultiPolygon[],
    width: number,
    height: number,
    n: number,
  ) {
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

  const n = 50;
  const values = new Array(n * n).fill(0).map(() => Math.random());

  // Create the contour generator
  const contours = countoursD3()
    .size([n, n])
    .thresholds(range(0, 1, 0.1));

  // Generate contour data
  const contourData = contours(values);

  $: if (width && height) {
    updateSvg(contourData, width, height, n);
  }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<svg class="absolute left-0 top-0" {width} {height} />
