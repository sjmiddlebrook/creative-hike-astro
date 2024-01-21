<script lang="ts">
  import { createFloating } from './action';

  let open = false;
  const { arrowElement, referenceElement, floating } = createFloating();
</script>

<button
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  on:mouseenter={() => (open = true)}
  on:mouseleave={() => (open = false)}
  bind:this={$referenceElement}
>
  Show
</button>

{#if open}
  <div
    class="px absolute w-max rounded-md bg-gray-800 p-1 text-sm font-semibold text-white"
    use:floating
  >
    Tooltip content positioned
    <div
      bind:this={$arrowElement}
      class="absolute h-2 w-2 rotate-45 transform bg-gray-800"
    />
  </div>
{/if}
