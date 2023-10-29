<script lang="ts">
  export let handleCopy: () => void;
</script>
<button
  class="absolute bottom-2 right-2 p-2"
  type="button"
  title="Copy to clipboard"
  on:click={handleCopy}
>
  <span class="sr-only">Copy</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-auto w-5 text-slate-500 sm:w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    /></svg
  >
</button>
