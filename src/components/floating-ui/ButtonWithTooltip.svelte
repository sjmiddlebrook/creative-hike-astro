<script lang="ts">
  import { offset, flip, shift } from '@floating-ui/dom';
  import { createFloatingActions, arrow } from '@actions/floating-ui';
  import { writable } from 'svelte/store';

  let arrowRef = writable<HTMLElement | null>(null);
  const [floatingRef, floatingContent] = createFloatingActions({
    placement: 'top',
    middleware: [
      offset(6),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    onComputed({ placement, middlewareData }) {
      if (!$arrowRef) return;
      const { x, y } = middlewareData.arrow ?? {};
      const staticSide =
        {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]] ?? '';
      Object.assign($arrowRef.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        [staticSide]: '-4px',
      });
    },
  });

  let showTooltip: boolean = false;
</script>

<button
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  on:mouseenter={() => (showTooltip = true)}
  on:mouseleave={() => (showTooltip = false)}
  use:floatingRef>Show</button
>

{#if showTooltip}
  <div
    class="absolute w-max rounded-md bg-gray-800 p-1 text-sm font-semibold text-white"
    use:floatingContent
  >
    Tooltip content positioned
    <div
      class="absolute h-2 w-2 rotate-45 transform bg-gray-800"
      bind:this={$arrowRef}
    />
  </div>
{/if}
