<script lang="ts">
  export let valueToCopy: string;
  const copyFeedbackTimeout = 1500;
  const copyMessage = 'copied!';
  let copyFeedback = '';
  function copyToClipboard() {
    navigator.clipboard.writeText(valueToCopy).then(
      () => {
        // console.log('clipboard write success');
        // show message for a short time
        copyFeedback = copyMessage;
        setTimeout(() => {
          copyFeedback = '';
        }, copyFeedbackTimeout);
      },
      () => {
        // console.log('clipboard write failed');
      },
    );
  }
</script>

<div class="relative flex items-center justify-center">
  {#if copyFeedback}
    <div class="absolute -top-5 -left-3 text-xs font-medium text-slate-600">
      {copyFeedback}
    </div>
  {/if}
  <button type="button" title="Copy to clipboard" on:click={copyToClipboard}>
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
</div>
