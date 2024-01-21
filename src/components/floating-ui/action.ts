import type {
  ComputePositionConfig,
  ArrowOptions,
  Middleware,
  MiddlewareState,
  Placement,
} from '@floating-ui/dom';
import {
  autoUpdate,
  computePosition,
  flip,
  shift,
  offset,
  arrow as arrowDOM,
} from '@floating-ui/dom';
import { remToPx } from '@utils/window/rem-to-px';
import { get, writable, type Writable } from 'svelte/store';
import { Side } from './constants';

type HTMLElementStore = Writable<HTMLElement | null>;
type ArrowOptionsWithStore = Omit<ArrowOptions, 'element'> & {
  elementStore: HTMLElementStore;
};

function getDefaultOptions({
  arrowElementStore,
}: {
  arrowElementStore?: HTMLElementStore;
} = {}): ComputePositionConfig {
  const middleware = [
    offset(remToPx(0.375)),
    flip(),
    shift({ padding: remToPx(0.5) }),
  ];
  if (arrowElementStore) {
    middleware.push(arrow({ elementStore: arrowElementStore }));
  }
  return {
    placement: Side.Top,
    middleware: middleware,
  };
}

function arrow(options: ArrowOptionsWithStore): Middleware {
  return {
    name: 'arrow',
    options,
    fn(args: MiddlewareState) {
      const element = get(options.elementStore);
      if (!element) return {};
      return arrowDOM({
        element,
        padding: options.padding,
      }).fn(args);
    },
  };
}

function getStaticSide(placement: Placement) {
  const side = placement.split('-')[0];
  return {
    [Side.Top]: Side.Bottom,
    [Side.Right]: Side.Left,
    [Side.Bottom]: Side.Top,
    [Side.Left]: Side.Right,
  }[side];
}

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
