<script lang="ts">
  import { get } from 'svelte/store';
  import { generateLoremIpsum } from '@utils/lorem-ipsum';
  import CopyToClipboard from '@components/svelte-utils/CopyToClipboard.svelte';
  import { persisted } from '@components/svelte-utils/local-storage';

  export let showLogo = true;
  const persistedBgColor = persisted('color', '#48617a');
  let persistedLoremIpsum = persisted('lorem-ipsum', {
    paragraphs: 1,
    characters: 280,
  });
  let paragraphs = get(persistedLoremIpsum).paragraphs;
  let characters = get(persistedLoremIpsum).characters;

  const errorColor = '#b91c1c';
  let bgColor = get(persistedBgColor);
  // let loremText = 'testing';
  let loremText = generateLoremIpsum(get(persistedLoremIpsum));

  function handleInputChange(event: Event, type: 'paragraphs' | 'characters') {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    if (!value) {
      return;
    }
    const updatedOptions = {
      ...get(persistedLoremIpsum),
      [type]: value,
    };
    persistedLoremIpsum.set(updatedOptions);
    // Example usage:
    try {
      loremText = generateLoremIpsum(updatedOptions);
    } catch (error) {
      bgColor = errorColor;
      loremText = 'Error generating lorem ipsum';
    }
  }

  function regenerateText() {
    try {
      loremText = generateLoremIpsum(get(persistedLoremIpsum));
    } catch (error) {
      bgColor = errorColor;
      loremText = 'Error generating lorem ipsum';
    }
  }
</script>

<div
  class="flex flex-col h-full w-full"
  style="background-color: {bgColor}"
>
  {#if showLogo}
    <a href="/" class="p-6 flex">
      <span class="sr-only">Home</span>
      <svg
        class="h-10 rounded-full border"
        viewBox="0 -120 513 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M230.058 30.75C216.067 47.662 195.935 71.924 185.32 84.665L166.021 107.831L162.064 119.165C159.888 125.399 156.282 136.35 154.051 143.5L149.995 156.5L143.978 160.5C137.037 165.115 133.935 168.634 121.065 186.5C107.349 205.541 105.697 207.365 94.105 216.269C65.664 238.117 51.06 251.81 48.529 259C44.084 271.632 21.663 372.419 5.595 452C3.097 464.375 0.816 475.512 0.526 476.75L0 479H256.08H512.161L511.604 474.75C511.298 472.412 510.351 463.975 509.501 456C508.65 448.025 505.994 425.3 503.597 405.5C501.2 385.7 498.718 364.55 498.081 358.5C495.967 338.43 490.68 319.023 484.78 309.676C478.668 299.994 464.798 288.64 449.536 280.824L441.41 276.664L427.534 237.082C419.902 215.312 409.996 187.205 405.52 174.622L397.384 151.743L382.461 138.727C333.742 96.23 341.744 104.711 288.607 39.25C271.084 17.663 256.465 0 256.122 0C255.778 0 244.05 13.837 230.058 30.75Z"
          fill="white"
        />
        <path
          d="M511.999 478.924C511.129 472.436 495.733 364.668 427.412 322L304.5 116L256 0.22998C269 14.4999 270.962 17.893 288.485 39.48C341.622 104.941 333.62 96.46 382.339 138.957L397.262 151.973L405.398 174.852C409.874 187.435 419.78 215.542 427.412 237.312L441.288 276.894L449.414 281.054C464.676 288.87 478.546 300.224 484.658 309.906C490.558 319.253 495.845 338.66 497.959 358.73C498.596 364.78 501.078 385.93 503.475 405.73C505.872 425.53 508.528 448.255 509.379 456.23C510.229 464.205 511.176 472.642 511.482 474.98L511.999 478.924Z"
          fill="#A8B6C0"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M193.086 88.2559L179.633 91.4319L172.886 99.4269C165.579 108.086 163.769 112.315 154.055 143.422L149.995 156.422L143.978 160.422C137.037 165.037 133.935 168.556 121.065 186.422C107.349 205.463 105.697 207.287 94.105 216.191C65.664 238.039 51.06 251.732 48.529 258.922C44.084 271.554 21.663 372.341 5.595 451.922C3.097 464.297 0.816 475.434 0.526 476.672L0 478.922H256.053H512.107L511.544 474.172C511.234 471.559 509.855 459.297 508.479 446.922C507.103 434.547 504.613 413.847 502.946 400.922L499.913 377.422L491.355 360.922C483.139 345.083 482.364 343.981 472.023 333.422L461.249 322.422L451.191 299.422C445.659 286.772 437.244 265.172 432.491 251.422C423.954 226.728 423.707 226.189 412.329 207.422C402.136 190.61 399.4 186.925 388.565 175.422L376.321 162.422L369.874 142.229L363.427 122.035L349.982 110.067C342.588 103.485 334.874 96.0899 332.841 93.6329C329.24 89.2839 328.928 89.1369 320.841 87.9919C316.274 87.3449 311.831 86.6099 310.966 86.3579C310.031 86.0859 305.095 89.3759 298.771 94.4889L288.147 103.077L268.843 100.627L249.538 98.1769L238.038 102.974C231.713 105.612 224.843 108.489 222.771 109.367C219.088 110.927 218.986 110.912 218.192 108.693C217.745 107.444 215.679 101.584 213.6 95.6719C210.821 87.7669 209.386 84.9429 208.179 85.0009C207.277 85.0439 200.484 86.5089 193.086 88.2559ZM302.297 136.667C305.304 141.482 315.274 157.278 324.453 171.768C333.631 186.259 341.005 198.452 340.839 198.863C340.674 199.275 335.214 197.641 328.706 195.232L316.874 190.853L306.285 196.929C300.461 200.27 295.21 202.817 294.617 202.588C294.023 202.359 289.848 199.19 285.337 195.547C280.827 191.903 276.48 188.922 275.678 188.922C274.877 188.922 267.995 191.587 260.385 194.845C252.776 198.102 246.36 200.577 246.127 200.345C245.345 199.562 295.241 126.986 296.184 127.535C296.539 127.742 299.29 131.851 302.297 136.667ZM248.407 172.172C247.187 174.209 215.902 216.332 214.8 217.422C214.118 218.096 214.006 215.376 214.456 209.084C215.568 193.525 214.445 195.24 231.917 182.418C246.954 171.384 250.021 169.478 248.407 172.172ZM147.854 196.955C152.539 209.069 157.731 224.767 158.619 229.5C159.115 232.145 158.439 234.11 154.977 240.085C150.353 248.064 117.894 295.361 100.529 319.422C94.575 327.672 83.582 342.972 76.099 353.422C58.17 378.463 51.774 386.992 51.29 386.507C50.679 385.896 54.471 378.851 107.311 282.422C126.114 248.109 123.479 255.03 135.672 207.922C138.732 196.097 141.467 186.045 141.75 185.585C142.623 184.162 143.638 186.053 147.854 196.955ZM362.374 251.114C367.134 258.645 371.474 265.845 372.02 267.114C373.771 271.191 382.156 302.067 381.801 303.132C381.613 303.697 376.35 299.988 370.106 294.889C361.177 287.597 358.411 285.825 357.146 286.589C348.353 291.894 336.898 298.116 336.555 297.772C336.319 297.536 339.257 284.311 343.085 268.382C346.913 252.454 350.294 238.339 350.599 237.016C351.339 233.811 351.743 234.295 362.374 251.114ZM309.019 302.193C306.724 310.019 303.451 320.922 301.747 326.422L298.648 336.422L297.898 330.422C297.485 327.122 296.633 319.52 296.006 313.528L294.866 302.635L303.702 293.747C309.639 287.775 312.645 285.368 312.865 286.412C313.045 287.265 311.315 294.367 309.019 302.193ZM174.601 339.289C171.7 348.423 168.591 354.942 159.431 371.099C148.732 389.972 144.988 395.784 145.072 393.386C145.09 392.856 146.165 385.311 147.459 376.62L149.813 360.818L155.879 355.328C159.376 352.163 165.217 344.988 169.668 338.389C173.915 332.092 177.583 327.134 177.82 327.371C178.057 327.608 176.609 332.971 174.601 339.289Z"
          fill="#4B545D"
        />
      </svg>
    </a>
  {/if}
  <div
    class={`flex w-full flex-col items-center justify-center sm:items-start space-y-2 placeholder-slate-800 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-6 ${showLogo ? 'mb-24' : 'mb-0'}`}
  >
    <div
      class="isolate flex h-fit rounded-md bg-white shadow-sm min-w-[180px] sm:min-w-[120px] sm:flex-col sm:justify-center sm:-space-y-px"
    >
      <div
        class="relative rounded-md rounded-r-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 sm:rounded-b-none sm:rounded-tr-md"
      >
        <label for="paragraphs" class="block text-xs font-medium text-slate-600"
          >paragraphs</label
        >
        <input
          value={paragraphs}
          on:input={(e) => handleInputChange(e, 'paragraphs')}
          type="number"
          name="paragraphs"
          id="paragraphs"
          min="1"
          max="20"
          class="w-full border-0 bg-transparent p-0 py-1 text-2xl text-slate-800 focus:ring-0 sm:text-4xl sm:text-slate-600"
        />
      </div>
      <div
        class="relative rounded-md rounded-l-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 sm:rounded-bl-md sm:rounded-t-none"
      >
        <label for="characters" class="block text-xs font-medium text-slate-600"
          >characters (max)</label
        >
        <input
          value={characters}
          on:input={(e) => handleInputChange(e, 'characters')}
          type="number"
          name="characters"
          id="characters"
          min="1"
          max="10000"
          step="10"
          class="w-full border-0 bg-transparent p-0 py-1 text-2xl text-slate-800 focus:ring-0 sm:text-4xl sm:text-slate-600"
        />
      </div>
    </div>
    <div
      class="relative mx-4 flex h-fit max-h-full flex-col justify-center rounded-md bg-white text-slate-800 shadow-sm sm:mx-0"
    >
      <div
        class="absolute left-0 top-0 w-full px-4 pt-4 pb-1 z-10 flex space-x-6 bg-white bg-opacity-90 rounded-md"
      >
        <button class="flex space-x-3" on:click={regenerateText}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-auto w-5 text-slate-500 sm:w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Regenerate</span>
        </button>
        <CopyToClipboard valueToCopy={loremText} buttonText="Copy Text" />
      </div>
      <label class="sr-only" for="lorem-text">Lorem Ipsum</label>
      <textarea
        id="lorem-text"
        name="lorem-text"
        value={loremText}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        rows={15}
        cols={50}
        class="block w-full rounded-md border-0 bg-white p-4 pt-12 focus:ring-0"
      />
    </div>
  </div>
</div>
