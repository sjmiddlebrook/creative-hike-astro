import type { ActionReturn } from 'svelte/action';

export function clickOutside(
  node: HTMLElement,
  runFunction: () => void
): ActionReturn {
  const handleClick = (event: MouseEvent) => {
    if (!node || !runFunction) return;
    if (!node.contains(event.target as Node)) {
      runFunction();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
