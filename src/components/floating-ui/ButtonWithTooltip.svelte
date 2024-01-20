<script lang="ts">
  import { offset, flip, shift } from '@floating-ui/dom';
  import { createFloatingActions } from '@actions/floating-ui';

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'top',
    middleware: [offset(6), flip(), shift()],
  });

  let showTooltip: boolean = false;
</script>

<button
  on:mouseenter={() => (showTooltip = true)}
  on:mouseleave={() => (showTooltip = false)}
  use:floatingRef>Hover me</button
>

{#if showTooltip}
  <div style="position:absolute" use:floatingContent>Tooltip</div>
{/if}
