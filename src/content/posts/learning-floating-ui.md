---
title: 'Learning Floating UI'
description: 'How to use the floating-ui package with svelte'
pubDate: '2024-01-21'
draft: false
tags: ['dev', 'html', 'svelte']
---

## Why use Floating UI

When developing a web application you are likely going to use UI components such as tooltips, popovers, dropdowns, or overlays. All these components need to be positioned relative to another element on the screen. As a developer you now need to figure out how to place these elements so the user will always be able to see them.

**Floating-ui** automatically places these elements in the right spot on the screen, even if the user is scrolling or resizing the window. This makes sure that important information is always easy to see and use, and it looks good on different devices and browsers.

## Middleware

**Flip**: places the element on the top or bottom depending on the position of the element on the screen

- Flip => y-axis

**Shift**: places the element to the left or right depending on the content in the element and how much horizontal space there is

- Shift => x-axis

**Offset**: gives the element some space from the reference element

## floating-ui with svelte

With svelte there is a package [svelte-floating-ui](https://github.com/fedorovvvv/svelte-floating-ui) that helps to create the floating ui elements with actions and stores.

To understand how this worked better, I tried to create a simplified version after looking at the svelte-floating-ui implementation. Since I wasn't using Virtual Elements, I left that bit out.

Here is an example of how to consume the floating ui in a Svelte Component.

Inside the script, you make a call to createFloating

```ts
const { arrowElement, referenceElement, floating } = createFloating();
```

The call to createFloating will return two stores and an action. One store is for the reference element and another is for the arrow element. The arrow element is optional if you want the floating tooltip to show an arrow.
Then the referenceElement store gets bound to whatever the triggering element is to show the tooltip and the floating action gets set on the element that should be floating.

Here is an example of the button with a tooltip

```html
<button
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  on:mouseenter="{()"
  =""
>
  (open = true)} on:mouseleave={() => (open = false)}
  bind:this={$referenceElement} > Show
</button>

{#if open}
<div
  class="px absolute w-max rounded-md bg-gray-800 p-1 text-sm font-semibold text-white"
  use:floating
>
  Tooltip content positioned
  <div
    bind:this="{$arrowElement}"
    class="absolute h-2 w-2 rotate-45 transform bg-gray-800"
  />
</div>
{/if}
```

Within the createFloating call is where the logic for interacting with the floating-ui library is.

The createFloating contains an update function that handles calculating the position of the floating element with a call to floating-ui's computePosition function.

The floatingAction function in createFloating hooks up the autoUpdate function provided by floating-ui that will continuously update the position of the floating element. Also the destroy function is called to clean up the auto update when the floating element is not shown.

Here is the full createFloating function:

```ts
export function createFloating(config?: ComputePositionConfig) {
  let referenceElementStore: HTMLElementStore = writable(null);
  let arrowElementStore: HTMLElementStore = writable(null);
  let floatingElement: HTMLElement;

  const options = {
    ...getDefaultOptions({ arrowElementStore }),
    ...config,
  };

  function update(updatedOptions?: ComputePositionConfig) {
    const referenceElement = get(referenceElementStore);
    if (!referenceElement || !floatingElement) return;
    const opts = { ...options, ...updatedOptions };
    computePosition(referenceElement, floatingElement, opts).then(
      ({ x, y, middlewareData, placement, strategy }) => {
        Object.assign(floatingElement.style, {
          position: strategy,
          left: `${x}px`,
          top: `${y}px`,
        });
        const arrowElement = get(arrowElementStore);
        if (!arrowElement) return;
        const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};
        const staticSide = getStaticSide(placement);
        if (!staticSide) return;
        Object.assign(arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      },
    );
  }

  function floatingAction(node: HTMLElement) {
    floatingElement = node;
    update();
    const referenceElement = get(referenceElementStore);
    if (!referenceElement) {
      return {
        destroy: () => {},
      };
    }
    const destroyAutoUpdate = autoUpdate(
      referenceElement,
      floatingElement,
      update,
    );
    return {
      destroy: destroyAutoUpdate,
    };
  }

  return {
    referenceElement: referenceElementStore,
    arrowElement: arrowElementStore,
    floating: floatingAction,
  };
}
```
You can check the an example of the button with a tooltip [here](/floating-ui)
