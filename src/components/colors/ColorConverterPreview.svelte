<script>
  import ColorConverter from './ColorConverter.svelte';
  export let showColorPicker = true;
</script>

<div class="h-80 w-full">
  <ColorConverter showLogo={false} showColorPicker={showColorPicker} />
</div>
