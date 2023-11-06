<script lang="ts">
  import { slide } from 'svelte/transition';
  import { clickOutside } from '@actions/click-outside';
  let isExpanded = false;

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<div
  class="relative"
  use:clickOutside={() => {
    isExpanded = false;
  }}
>
  <button
    on:click={toggleExpanded}
    type="button"
    class="inline-flex items-center gap-x-1 font-semibold leading-6 text-zinc-800 dark:text-zinc-100"
  >
    <span>Tools</span>
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>
  {#if isExpanded}
    <div
      transition:slide={{ duration: 150 }}
      class="absolute z-10 flex w-screen max-w-max -translate-x-1/2 px-4 pt-3 sm:left-1/2"
    >
      <div
        class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-zinc-50 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
      >
        <div
          class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
        >
          <div
            class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600 group-hover:text-teal-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"
              /><path d="m5 2 5 5" /><path d="M2 13h15" /><path
                d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"
              /></svg
            >
          </div>
          <div>
            <a href="/color-converter" class="font-semibold text-gray-900">
              Color picker
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">
              Pick a color or convert between HEX and RGB
            </p>
          </div>
        </div>
        <div
          class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
        >
          <div
            class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600 group-hover:text-teal-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div>
            <a href="/lorem-ipsum" class="font-semibold text-gray-900">
              Lorem Ipsum
              <span class="absolute inset-0"></span>
            </a>
            <p class="mt-1 text-gray-600">Generate random lorem ipsum text</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
